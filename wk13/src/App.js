import React, { useState } from "react";
import { useFormik } from "formik";
import { Form, Button, Container, Alert } from "react-bootstrap";

function App() {
  const formik = useFormik({
    initialValues: {
      emailField: "",
      pswField: "",
    },
    onSubmit: values => submit(values),
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);

  /**
   * Joins an array of error messages, using commas and a period for display on the UI
   * @param {Array} array an array of field errors
   * @returns Joined error messages with `, ` and `.`
   */
  const joinErrors = array =>
    array
      .map((s, i, arr) => (i === arr.length - 1 ? s + "." : s))
      .reduce((a, b) => (a += ", " + b));

  /**
   * Validates correct email and password input before displaying errors or a success message
   * @param {Object} values form values including email and password
   */
  const submit = values => {
    setErrors({ email: "", password: "" });
    setSuccess(false);
    const { emailField: email, pswField: password } = values;

    let validationErrors = [];
    if (!email) {
      validationErrors.push({
        email: "Field Required",
      });
    }
    if (!password) {
      validationErrors.push({
        password: "Field Required",
      });
    }
    if (!email.match(/^[a-zA-Z0-9-_]+@{1}[a-zA-Z0-9-_]+\.[a-zA-Z]+/g)) {
      validationErrors.push({
        email: "Username should be an email",
      });
    }
    if (!validationErrors.length) {
      setSuccess(true);
      setTimeout(() => alert("Login Successful"), 100);
      return;
    }
    const emailErrors = validationErrors
      .map(error => error.email)
      .filter(value => !!value);
    const passwordErrors = validationErrors
      .map(error => error.password)
      .filter(value => !!value);

    setErrors({
      email: !!emailErrors.length && joinErrors(emailErrors),
      password: !!passwordErrors.length && joinErrors(passwordErrors),
    });
  };

  return (
    <Container xs={3} className="mt-5">
      {(success || errors.email || errors.password) && (
        <Alert variant={success ? "success" : "danger"}>
          {success && "Successfully logged in!"}
          {!!errors.email && "Email Error | " + errors.email}
          {!!errors.email && !!errors.password && <br />}
          {!!errors.password && "Password Error | " + errors.password}
        </Alert>
      )}
      <h1>Login</h1>
      <Form onSubmit={formik.handleSubmit} xs={3}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="emailField">Email Address</Form.Label>
          <Form.Control
            id="emailField"
            type="email"
            name="emailField"
            autoComplete="username"
            onChange={formik.handleChange}
            value={formik.values.emailField}
            placeholder="Email Address"
          />
          <Form.Text className="text-danger" id="emailError">
            {errors.email}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="pswField">Password</Form.Label>
          <Form.Control
            id="pswField"
            type="password"
            name="pswField"
            autoComplete="current-password"
            onChange={formik.handleChange}
            value={formik.values.pswField}
            placeholder="Password"
          />
          <Form.Text className="text-danger" id="pswError">
            {errors.password}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" id="submitBtn">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default App;
