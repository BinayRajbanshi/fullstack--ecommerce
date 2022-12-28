import { useEffect } from "react";
import {
  useParams,
  useSearchParams,
  Link,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { removeFromCart } from "../actions/cartActions";
import {
  Image,
  Col,
  Row,
  ListGroup,
  Container,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((store) => store.cart);

  const { userInfo } = useSelector((store) => store.userLogin) || {};
  // const { userInfo: infoRegister} = useSelector((store) => store.userRegister);
  // let user_info;
  // if (!infoLogin) {
  //   user_info = infoRegister;
  // } else {
  //   user_info = infoLogin;
  // }

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = searchParams.get("qty");
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, qty, id]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      navigate("/shipping");
    }
    // navigate("/login?redirect=/shipping");
    // if (!userInfo) {
    //   navigate("/login");
    // } else if (userInfo) {
    //   navigate("/shipping");
    // }
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message variant="primary">
              Your cart is Empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => {
                return (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>{item.price * item.qty}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {Array.from(
                            { length: item.countInStock },
                            (_, index) => {
                              return index;
                            }
                          ).map((index) => (
                            <option key={index + 1}>{index + 1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={1}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => {
                            handleRemoveFromCart(item.product);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce((acc, item) => {
                    acc = acc + Number(item.qty);
                    return acc;
                  }, 0)}
                  ) items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => {
                    acc += item.price * item.qty;
                    return acc;
                  }, 0)
                  .toFixed(3)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
