import React, { useContext, useEffect, useState } from 'react';
import {
  Navbar,
  Container,
  Nav,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import isEqual from 'lodash/isEqual';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../services/UserContext';
import { sessionStorageKeys, routes as routeConstants } from '../constants';

const Header = ({ location }) => {
  const { user, userExists } = useContext(UserContext);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (userExists() || sessionStorage.getItem(sessionStorageKeys.token)) {
      setRoutes([
        routeConstants.home,
        routeConstants.withdraw,
        routeConstants.deposit,
        routeConstants.data,
        routeConstants.logout,
      ]);
      return;
    }
    setRoutes([
      routeConstants.home,
      routeConstants.login,
      routeConstants.create_account,
    ]);
  }, [userExists, user]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand to={routeConstants.home.path} as={Link}>
          Bad Bank
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {routes.map((route) => (
              <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                key={`pop-header-${route.name}}`}
                overlay={
                  <Popover>
                    <Popover.Header>{route.name}</Popover.Header>
                    <Popover.Body>{route.description}</Popover.Body>
                  </Popover>
                }
              >
                <Nav.Link
                  className={`nav-link ${
                    isEqual(route.path, location.pathname) && `text-primary`
                  } ${
                    isEqual(route, routeConstants.create_account) &&
                    'bg-primary rounded text-light mr-4'
                  } ${
                    (isEqual(route, routeConstants.login) ||
                      isEqual(route, routeConstants.logout)) &&
                    'bg-dark text-light bold rounded mx-2'
                  }`}
                  to={route.path}
                  as={Link}
                  key={`header-link-${route.name}`}
                >
                  {route.name}
                </Nav.Link>
              </OverlayTrigger>
            ))}
            {userExists ? <Nav.Link>{user.name}</Nav.Link> : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default withRouter(Header);
