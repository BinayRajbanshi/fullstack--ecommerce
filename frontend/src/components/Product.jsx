import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { name, _id, image, price, rating, numReviews } = product;
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>

      <Card.Text as="div">
        <div className="my-3">
          <Rating rating={rating} numReviews={numReviews} />
        </div>
      </Card.Text>
      <Card.Text as="h4" style={{ color: "black" }}>
        ${price}
      </Card.Text>
    </Card>
  );
};

export default Product;
