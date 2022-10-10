import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useEffect } from "react";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (store) => store.productList
  );

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  return (
    <>
      <Container className="mt-3">
        <h1>Latest Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
