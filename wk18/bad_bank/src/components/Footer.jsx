import { Navbar, NavbarBrand, Container } from 'react-bootstrap';
const Footer = () => {
  return (
    <div className="fixed-bottom bg-light">
      <Navbar>
        <Container>
          <NavbarBrand>Bad Bank™</NavbarBrand>
        </Container>
      </Navbar>
    </div>
  );
};

export default Footer;
