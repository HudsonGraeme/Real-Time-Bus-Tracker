import { useState } from 'react';
import { Card, InputGroup, Button, Row, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../services/UserContext';
import { useContext } from 'react';
import { capitalize } from 'lodash';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routes } from '../constants';
import { useHistory } from 'react-router-dom';

// Frontend validation
const schema = Yup.object().shape({
  email: Yup.string()
    .default('')
    .email()
    .required('Please enter a valid email'),
  password: Yup.string().default('').required('Please enter a valid password'),
});

const Login = () => {
  const { signin } = useContext(UserContext);
  const [alert, setAlert] = useState({});
  const history = useHistory();

  const submitForm = (e, resetForm) => {
    signin(e)
      .then(() => {
        resetForm();
        setAlert({
          open: true,
          type: 'success',
          message: 'Successfully signed in',
        });
        history.push(routes.data.path);
      })
      .catch((ex) =>
        setAlert({
          open: true,
          type: 'danger',
          message:
            'Failed to login. Please check your credentials and try again.',
        })
      )
      .finally(() => {
        setTimeout(() => setAlert({}), 2500);
      });
  };

  return (
    <Card className="mx-auto w-50 mt-5">
      {alert.open && <Alert variant={alert.type}>{alert.message}</Alert>}
      <Card.Title className="mb-5 pt-5 text-left display-4">Login</Card.Title>
      <Card.Body className="p-5">
        <Formik
          validationSchema={schema}
          onSubmit={(vals, { resetForm }) => {
            submitForm(vals, resetForm);
          }}
          initialValues={{
            email: '',
            password: '',
          }}
        >
          {({ handleSubmit, handleChange, values, isValid, errors, dirty }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="my-2">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    name="email"
                    autoComplete="email"
                    placeholder="MrJohnDoe"
                    value={values.email}
                    isInvalid={!!errors.email}
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
                  <InputGroup.Text
                    className={
                      !!errors.password && 'text-danger border border-danger'
                    }
                  >
                    &#x1f512;
                  </InputGroup.Text>
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
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
      <Card.Footer className="d-flex flex-row-reverse align-items-center">
        <Button
          variant="primary"
          className="w-50"
          as={Link}
          to={routes.create_account.path}
        >
          Don't have an account?
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Login;
