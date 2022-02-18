import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { UserContext } from '../services/UserContext';
import { Alert } from 'react-bootstrap';

const Login = () => {
  const { logout } = useContext(UserContext);

  return (
    <Card className="mx-auto w-50 mt-5">
      {alert.open && <Alert variant={alert.type}>{alert.message}</Alert>}
      <Card.Title className="pt-5 text-left display-4">
        Are you sure you want to log out?
      </Card.Title>
      <Card.Body className="p-5">
        Press the below logout button to confirm.
      </Card.Body>
      <Card.Footer>
        <Button className="bg-danger border-danger w-50 mx-2" onClick={logout}>
          Logout
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Login;
