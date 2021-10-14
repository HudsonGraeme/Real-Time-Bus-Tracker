import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
const Header = ({ routes, location }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href={"/"}>Bad Bank</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {routes.map((route) => (
              <Nav.Link
                className={location.pathname === route.path && `text-primary`}
                href={route.path}
              >
                {route.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default withRouter(Header);
