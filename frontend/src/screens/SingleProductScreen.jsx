import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productDetails, productReview } from "../actions/productActions";
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
import { PRODUCT_REVIEW_RESET } from "../constants/productConstants";

const SingleProduct = () => {
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState("");
  const [review, setReview] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, product } = useSelector(
    (store) => store.productDetails
  );
  const {
    loading: reviewLoading,
    error: reviewError,
    success,
  } = useSelector((store) => {
    return store.productReview;
  });
  const { userInfo } = useSelector((state) => state.userLogin);
  const { id } = useParams();

  useEffect(() => {
    if (success) {
      setReview(0);
      setComment("");
    }
    dispatch(productDetails(id));
    dispatch({
      type: PRODUCT_REVIEW_RESET,
    });
  }, [dispatch, id, success]);

  const addToCartHandler = (e) => {
    e.preventDefault();
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const {
    image,
    rating,
    name,
    description,
    brand,
    category,
    price,
    countInStock,
    numReviews,
  } = product;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(productReview(id, comment, review));
  };

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
              <Image src={image} alt={name}></Image>
            </Col>
            <Col md={3}>
              <ListGroup varient="flush">
                <ListGroup.Item>
                  <h3>{name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating rating={rating} />
                  <p>{numReviews} people reviewed the product</p>
                </ListGroup.Item>
                <ListGroup.Item>Brand: {brand}</ListGroup.Item>
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
          <Row className="mt-4">
            <Col>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message>No Reviews Yet</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => {
                  return (
                    <ListGroup.Item key={review._id}>
                      <p style={{ fontSize: "16px", fontWeight: 600 }}>
                        {review.name}
                      </p>
                      <Rating rating={review.review} />
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Write a Reveiw</h2>
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          required
                          as="select"
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment" className="mt-4">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          required
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      {reviewError && (
                        <Message variant="danger">{reviewError}</Message>
                      )}
                      {reviewLoading && <Loader />}
                      <Button
                        className="mt-4"
                        disabled={reviewLoading}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="danger">
                      Please <Link to="/login">login</Link> to your account to
                      write a reveiw.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default SingleProduct;
