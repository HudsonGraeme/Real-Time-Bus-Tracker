import { useState, useEffect } from 'react';
import { Card, InputGroup, Button, Row, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../services/UserContext';
import { useContext } from 'react';
import { capitalize } from 'lodash';
import { Alert } from 'react-bootstrap';

const schema = Yup.object().shape({
  name: Yup.string().default('').required(),
  email: Yup.string().email('Invalid email address').default('').required(),
  password: Yup.string()
    .min(8, 'Your password must be a minimum of 8 characters in length')
    .default('2')
    .required(),
});

const CreateAccount = () => {
  const { createUser, users } = useContext(UserContext);
  const [alert, setAlert] = useState({});
  // Once the alert is shown, hide it after 2.5s
  useEffect(() => {
    if (!alert.open) {
      return;
    }
    const timeout = setTimeout(() => setAlert({}), 2500);
    return () => clearTimeout(timeout);
  }, [alert]);

  const submitForm = (e) => {
    createUser(e);
    setAlert({
      open: true,
      type: 'success',
      message: 'Successfully created a new account',
    });
  };

  return (
    <Card className="mx-auto w-50 mt-5 p-5">
      {alert.open && <Alert variant={alert.type}>{alert.message}</Alert>}
      <Card.Title className="mb-5 text-left display-4">
        Create an Account
      </Card.Title>
      <Card.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(vals, { resetForm }) => {
            submitForm(vals);
            resetForm();
          }}
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
        >
          {({ handleSubmit, handleChange, values, isValid, errors, dirty }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="my-2">
                <Form.Label>Full Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="John Doe"
                    value={values.name}
                    isInvalid={!!errors.name}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {capitalize(errors.name)}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Row} className="my-2">
                <Form.Label>Email Address</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text
                    className={
                      !!errors.email && 'text-danger border border-danger'
                    }
                  >
                    @
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    autoComplete="username"
                    value={values.email}
                    isInvalid={!!errors.email}
                    placeholder="johndoe@mail.com"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {capitalize(errors.email)}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Row} className="my-2">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={values.password}
                    placeholder="**************"
                    isInvalid={!!errors.password}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {capitalize(errors.password)}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Button
                type="submit"
                disabled={!isValid || !dirty}
                className="mt-5 w-25 mx-2 inline-block"
              >
                {users.length ? 'Add another account' : 'Create Account'}
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default CreateAccount;
