import { useEffect } from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import PaymentSteps from "../components/PaymentSteps";
import { placeOrder } from "../actions/orderActions";
import { useNavigate } from "react-router-dom";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { loading, success, error, orderDetails } = useSelector(
    (store) => store.orderCreate
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function to round off the numbers
  const roundOff = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = cart.cartItems.reduce((acc, item) => {
    acc = acc + Number(item.price * item.qty);
    return acc;
  }, 0);

  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;

  // 15% tax included
  cart.taxPrice = roundOff(Number(0.015 * cart.itemsPrice));

  cart.total =
    Number(cart.taxPrice) +
    Number(cart.shippingPrice) +
    Number(cart.itemsPrice);

  const orderInfo = {
    orderItems: cart.cartItems,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    itemsPrice: cart.itemsPrice,
    taxPrice: cart.taxPrice,
    shippingPrice: cart.shippingPrice,
    totalPrice: roundOff(cart.total),
  };
  const placeOrderHandler = () => {
    dispatch(placeOrder(orderInfo));
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${orderDetails._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  if (loading) {
    return (
      <Container>
        <Loader></Loader>
      </Container>
    );
  }
  return (
    <Container>
      <PaymentSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length < 1 ? (
                <>
                  <Message>Your Cart is Empty</Message>
                  <Link to="/">
                    <Button type="button">Go Shop Something</Button>
                  </Link>
                </>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            ></Image>
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x Rs.{item.price} = Rs.
                            {(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs. {roundOff(cart.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs. {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs. {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs. {roundOff(cart.total)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;
