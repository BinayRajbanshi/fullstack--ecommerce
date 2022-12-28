import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

import PaymentSteps from "../components/PaymentSteps";

const PaymentScreen = () => {
  const { shippingAddress } = useSelector((store) => store.cart);

  if (!shippingAddress) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeOrder");
  };

  return (
    <FormContainer>
      <PaymentSteps step1 step2 step3 />
      <h1 className="text-center">Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-3">
          <Form.Label as="legend">Select Method</Form.Label>
          <Form.Check
            type="radio"
            id="PayPal"
            checked
            name="paymentMethod"
            value="PayPal"
            onChange={(e) => setPaymentMethod(e.target.value)}
            label="Paypal or Credit Card"
          />
          <Form.Check
            type="radio"
            id="Esewa"
            name="paymentMethod"
            value="Esewa"
            onChange={(e) => setPaymentMethod(e.target.value)}
            label="Esewa"
          />
        </Form.Group>
        <Button className="mt-4" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
