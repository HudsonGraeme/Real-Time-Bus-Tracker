import React from 'react';
import {
  Navbar,
  Container,
  Nav,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { routes } from '../constants';
import { isEqual } from 'lodash';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const Header = ({ location }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand to={routes[0].path} as={Link}>
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
                  }`}
                  to={route.path}
                  as={Link}
                  key={`header-link-${route.name}`}
                >
                  {route.name}
                </Nav.Link>
              </OverlayTrigger>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default withRouter(Header);
