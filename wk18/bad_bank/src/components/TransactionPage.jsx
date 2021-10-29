import {
  Card,
  FloatingLabel,
  InputGroup,
  Button,
  Form,
  Alert,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { UserContext } from '../services/UserContext';
import { useContext } from 'react';
import { capitalize } from 'lodash';
import { useState } from 'react';
import { formatCurrency, validNumber } from '../services/Utilities';
import { useEffect } from 'react';

const TransactionPage = ({
  title,
  transactionType,
  validationSchema,
  submitFunction,
  userSelectionSideEffect = () => {},
}) => {
  const { users } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState({});
  const [alert, setAlert] = useState({});

  // Once the alert is shown, hide it after 2.5s
  useEffect(() => {
    if (!alert.open) {
      return;
    }
    const timeout = setTimeout(() => setAlert({}), 2500);
    return () => clearTimeout(timeout);
  }, [alert]);

  const submitForm = (account, amount) => {
    if (
      transactionType === 'Withdraw' &&
      amount > users.find(({ id }) => account === id).balance
    ) {
      setAlert({
        open: true,
        type: 'warning',
        message:
          'Successfully completed your transaction, however your account is in overdraft. Please make a deposit at your earliest convenience.',
      });
    } else {
      setAlert({
        open: true,
        type: 'success',
        message: 'Successfully completed your transaction.',
      });
    }
    submitFunction(account, amount);
  };

  return (
    <Card className="mx-auto w-50 mt-5 p-5">
      {alert.open && <Alert variant={alert.type}>{alert.message}</Alert>}
      <Card.Title className="mb-5 text-left display-4">{title}</Card.Title>
      <Card.Body>
        <Formik
          validationSchema={validationSchema}
          onSubmit={({ account, amount }, { resetForm }) => {
            submitForm(account, amount);
            resetForm();
          }}
          initialValues={{
            account: '',
            amount: 0.0,
          }}
        >
          {({ handleSubmit, handleChange, values, dirty, isValid, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="my-2">
                <FloatingLabel
                  label={
                    !!errors.account
                      ? capitalize(errors.account)
                      : `Account to ${transactionType} ${
                          transactionType === 'Withdraw' ? 'from' : 'to'
                        }`
                  }
                  className={!!errors.account && 'text-danger font-weight-bold'}
                >
                  <Form.Select
                    className="form-select mb-4"
                    value={values.account}
                    name="account"
                    onChange={(e) => {
                      if (e.target.value) {
                        setSelectedUser(
                          e.target.value
                            ? users.find(
                                (user) => user.id === e.target.value
                              ) || {}
                            : {}
                        );
                        userSelectionSideEffect(e.target.value);
                      }
                      handleChange(e);
                    }}
                    isInvalid={!!errors.account}
                  >
                    <option key="default" value="">
                      -
                    </option>
                    {users.map((user) => (
                      <option key={`option-account-${user.id}`} value={user.id}>
                        {`${user.name} (${
                          validNumber(user.balance)
                            ? formatCurrency(user.balance)
                            : 'Balance Error'
                        }) ${
                          validNumber(user.balance) && user.balance < 0
                            ? '***Overdraft***'
                            : ''
                        }`}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="my-2">
                <Form.Label>Amount</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="amount"
                    placeholder="99.99"
                    value={values.amount}
                    onChange={handleChange}
                    isInvalid={!!errors.amount}
                  />
                  <Form.Control.Feedback type="invalid">
                    {capitalize(errors.amount)}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Button
                type="submit"
                className="mt-5 w-50 mx-2 inline-block"
                disabled={!isValid || !dirty}
              >
                {`${transactionType} `}
                {isValid &&
                  validNumber(values.amount) &&
                  formatCurrency(values.amount)}
                {isValid &&
                  selectedUser.name &&
                  ` ${transactionType === 'Withdraw' ? 'from' : 'into'} ${
                    selectedUser.name
                  }'s account`}
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default TransactionPage;
