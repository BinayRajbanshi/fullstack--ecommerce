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
import { getOrderDetails, orderDeliver } from "../actions/orderActions";
import { useParams } from "react-router-dom";
// import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import PayPalButton from "../components/PaypalButton";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const orderDetailsss = useSelector((store) => store.orderDetailsss);
  const { loading, error, order } = orderDetailsss;

  const {
    loading: deliverLoading,
    error: deliverError,
    success: deliverSuccess,
  } = useSelector((store) => store.orderDeliver);

  const handleDelivery = () => {
    dispatch(orderDeliver(order));
  };

  const roundOff = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };
  const {
    loading: payLoading,
    success: paySuccess,
    error: payError,
  } = useSelector((store) => store.orderPay);

  const { userInfo } = useSelector((state) => {
    return state.userLogin;
  });

  useEffect(() => {
    if (!order || order._id !== orderId || paySuccess || deliverSuccess) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId, dispatch, paySuccess, deliverSuccess]);

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => {
      acc = acc + Number(item.price * item.qty);
      return acc;
    }, 0);
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Container>
      <h1>Order: {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered at {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant="success">Paid at: {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length < 1 ? (
                <>
                  <Message>No orders</Message>
                  <Link to="/">
                    <Button type="button">Go Shop Something</Button>
                  </Link>
                </>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => {
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
                  <Col>Rs. {roundOff(order.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs. {roundOff(order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs. {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs. {roundOff(order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {/* {payLoading || !sdkReady ? <Loader /> : <PayPalButton />} */}
                  {payLoading && <Loader />}
                  {payError && <Message variant="danger">{payError}</Message>}
                  {!paySuccess && <PayPalButton orderId={orderId} />}
                </ListGroup.Item>
              )}
            </ListGroup>
            {/* show mark as delivered button only admin is loggedin & order is paid and order is not delivered */}
            {deliverLoading && <Loader />}
            {deliverError && (
              <ListGroup.Item>
                <Message variant="danger">{deliverError}</Message>
              </ListGroup.Item>
            )}

            {userInfo &&
              userInfo.admin &&
              order.isPaid &&
              !order.isDelivered && (
                <Button type="button" onClick={handleDelivery}>
                  Mark as Delivered
                </Button>
              )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderScreen;
