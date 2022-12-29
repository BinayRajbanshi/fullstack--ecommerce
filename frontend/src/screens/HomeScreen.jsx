import { Container, Row, Col, Button } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProduct, searchProduct } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useEffect, useState, React } from "react";
import { useParams } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error, allCategories } = useSelector(
    (store) => store.productList
  );

  const { product } = useSelector((store) => store.productSearch);

  const { keyword } = useParams();

  useEffect(() => {
    dispatch(searchProduct(keyword));
  }, [dispatch, keyword]);
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
        {!keyword && <ProductCarousel />}
        <h1>Latest Products </h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {product && product.length === 0 && (
              <p>Could not find what you're looking for</p>
            )}
            {product &&
              product.map((product) => {
                return (
                  <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product} />
                  </Col>
                );
              })}
          </Row>
        )}
      </Container>
      {/* filter by categories */}
      <Container className="mt-3">
        <h1>Filter by categories</h1>
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
                  <Col sm={12} md={6} lg={3} xl={3} key={product._id}>
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
