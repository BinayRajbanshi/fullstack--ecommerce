import React from "react";
import { useParams } from "react-router-dom";
import products from "../products";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const SingleProduct = () => {
  const { id } = useParams();
  const singleProduct = products.find((product) => product._id === id);
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
  } = singleProduct;
  return (
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
                  <Col>{countInStock >= 1 ? "In Stock" : "out of stock"}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleProduct;
