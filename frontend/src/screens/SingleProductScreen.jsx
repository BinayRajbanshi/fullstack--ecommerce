import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useSelector, useDispatch } from "react-redux";

const SingleProduct = () => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, product } = useSelector(
    (store) => store.productDetails
  );
  const { cartItems } = useSelector((store) => store.cart);
  const { id } = useParams();

  useEffect(() => {
    dispatch(productDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = (e) => {
    e.preventDefault();
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const {
    image: img,
    rating,
    name,
    description,
    brand,
    category,
    price,
    countInStock,
    numReviews,
  } = product;

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" />
      ) : (
        <Container>
          <Link className="btn btn-light my-3" to="/">
            Go back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={img} alt={name}></Image>
            </Col>
            <Col md={3}>
              <ListGroup varient="flush">
                <ListGroup.Item>
                  <h3>{name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating rating={rating} numReviews={numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>Price: {price}</ListGroup.Item>
                <ListGroup.Item>Description: {description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {countInStock >= 1 ? "In Stock" : "out of stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {/* Two ways of creating array of index */}
                            {/* {[...Array(countInStock).keys()].map((index) => (
                              <option key={index}>{index}</option>
                            ))} */}

                            {Array.from(
                              { length: countInStock },
                              (_, index) => {
                                return index;
                              }
                            ).map((index) => (
                              <option key={index + 1}>{index + 1}</option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default SingleProduct;
