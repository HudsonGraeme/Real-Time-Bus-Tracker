import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Logo from '../images/BankLogo.png';
import { routes } from '../constants';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <Card className="w-50 mt-5 mx-5">
    <Card.Header>Bad Bank</Card.Header>
    <Card.Img
      variant="bottom"
      className="w-50 mt-5 text-center d-block mx-auto"
      src={Logo}
    />
    <Card.Title>Welcome to the Bad Bank™</Card.Title>
    <Card.Subtitle className="my-2 mb-4">
      We may not be a good bank, but we'll take your money.
    </Card.Subtitle>
    <Card.Body className="px-5">
      Sign up today and receive our $500* new client bonus. Looking for a
      mortgage? Let one of our qualified financial advisors help you find the
      right fit. With benefits for new homebuyers including fixed and variable
      rate mortgages, Bad Bank™ has you covered. Looking to outpace inflation
      with a high interest savings account? Bad Bank™ can help you there, too.
      We offer up to 3%** interest on premium savings plans. Make the switch to
      Bad Bank™ and enjoy the quality of elite banking without the extra cost.
      To sign up for an account, click the button below or contact one of our
      agents at
      <br />
      1-800-
      <span
        onClick={
          () =>
            (window.location.href =
              'https://www.youtube.com/embed/axLRUszuu9I?start=57&end=61&autoplay=1') // 😁
        }
      >
        867-5309
      </span>
      .
      <br />
      <div
        style={{ fontSize: '6px', textAlign: 'left' }}
        className="text-left ml-0 mr-0"
      >
        * We don't really offer a sign up bonus (because we're bad)
        <br />
        ** There are no interest rates here, we do not support withdrawals
        either (sorry)
      </div>
    </Card.Body>
    <Button
      variant="primary"
      className="w-25 mx-auto d-block my-2 mb-5"
      as={Link}
      to={routes.find((route) => route.name === 'Create Account').path}
    >
      Click here to create an account
    </Button>
  </Card>
);

export default HomePage;
