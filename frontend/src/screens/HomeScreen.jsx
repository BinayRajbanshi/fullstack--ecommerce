import { Container, Row, Col, Button } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useEffect, useState, React } from "react";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error, allCategories } = useSelector(
    (store) => store.productList
  );
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  const [filtered, setFiltered] = useState(products);

  const filterItems = (category) => {
    if (category === "all") {
      setFiltered(products);
      return;
    }

    const newItems = products.filter((item) => item.category === category);
    setFiltered(newItems);
  };

  return (
    <>
      <Container className="mt-3">
        <h1>Latest Products </h1>
        <h5>Filter by categories</h5>
        <Container>
          {allCategories &&
            allCategories.map((item, index) => {
              return (
                <Button onClick={() => filterItems(item)} key={index}>
                  {item}
                </Button>
              );
            })}
        </Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {filtered &&
              filtered.map((product) => {
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
