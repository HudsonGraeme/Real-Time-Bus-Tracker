import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Logo from "../images/BankLogo.png";
import { useHistory } from "react-router-dom";

const HomePage = (props) => {
  const history = useHistory();
  return (
    <Card className="w-50 mt-5 mx-5">
      <Card.Header>Bad Bank</Card.Header>
      <Card.Img
        variant="bottom"
        className="w-50 mt-5 text-center d-block mx-auto"
        src={Logo}
      />
      <Card.Title>Welcome to the bank</Card.Title>
      <Card.Subtitle className="my-2 mb-4">
        For all of your banking needs
      </Card.Subtitle>
      <Card.Text className="px-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        tempus elit ac orci finibus, id faucibus eros condimentum. Praesent
        aliquam elit a dolor vehicula varius. Nullam fermentum tortor non neque
        consequat semper. Donec commodo ultricies blandit. Integer vitae
        efficitur dolor. Cras nec interdum tortor. Etiam dapibus, diam non
        maximus congue, enim odio rutrum erat, scelerisque varius ipsum massa ac
        massa. Proin eget tellus bibendum, malesuada nisi eu, dignissim sem.
        Praesent iaculis lobortis orci, in ornare nisi dapibus at. Donec maximus
        malesuada lectus vitae molestie. Suspendisse molestie enim odio, ac
        convallis eros aliquet eu. Nulla ultricies viverra enim, a placerat
        ligula pellentesque eget. Integer gravida tristique mauris sit amet
        pulvinar. In euismod nisl ut erat gravida euismod. Etiam scelerisque
        lectus eget posuere tempus.
      </Card.Text>
      <Button
        variant="primary"
        className="w-25 mx-auto d-block my-2"
        onClick={() => history.push("/account")}
      >
        Click here to create an account
      </Button>
    </Card>
  );
};

export default HomePage;
