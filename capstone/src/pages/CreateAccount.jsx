import { useState, useEffect } from 'react';
import { Card, InputGroup, Button, Row, Form, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../services/UserContext';
import { useContext } from 'react';
import { capitalize } from 'lodash';
import { Alert } from 'react-bootstrap';

// Frontend validation
const schema = Yup.object().shape({
  first_name: Yup.string('ss')
    .default('')
    .required('Please enter your first name'),
  last_name: Yup.string().default('').required('Please enter your last name'),
  email: Yup.string()
    .required('Please enter your E-Mail address')
    .email('Invalid email address')
    .default(''),
  username: Yup.string().default('').required('Please enter a valid username'),
  password: Yup.string()
    .default('')
    .required('Please enter a valid password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Ensure your password contains 8 characters - One Uppercase, One Lowercase, One Number and One Special Character'
    ),
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
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
          }}
        >
          {({ handleSubmit, handleChange, values, isValid, errors, dirty }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="my-2">
                <Form.Label>First Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    name="first_name"
                    autoComplete="name"
                    placeholder="John"
                    value={values.first_name}
                    isInvalid={!!errors.first_name}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {capitalize(errors.first_name)}
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Label>Last Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    name="last_name"
                    autoComplete="name"
                    placeholder="Doe"
                    value={values.last_name}
                    isInvalid={!!errors.last_name}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {capitalize(errors.last_name)}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Row} className="my-2">
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    name="username"
                    autoComplete="name"
                    placeholder="MrJohnDoe"
                    value={values.username}
                    isInvalid={!!errors.username}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {capitalize(errors.username)}
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
                    ✉
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
                  <InputGroup.Text
                    className={
                      !!errors.email && 'text-danger border border-danger'
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
