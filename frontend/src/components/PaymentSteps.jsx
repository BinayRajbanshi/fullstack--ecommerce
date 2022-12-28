import { Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const PaymentSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Container>
      <Nav className="justify-content-center my-3">
        {step1 ? (
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Login</Nav.Link>
        )}
        {step2 ? (
          <Nav.Link as={Link} to="/shipping">
            Shipping
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
        {step3 ? (
          <Nav.Link as={Link} to="/payment">
            Payment
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
        {step4 ? (
          <Nav.Link as={Link} to="/placeOrder">
            Place Order
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav>
    </Container>
  );
};

export default PaymentSteps;
