import { useEffect } from "react";
import { getAdminOrders } from "../actions/orderActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, error, loading } = useSelector((store) => store.adminOrders);
  const { userInfo } = useSelector((store) => store.userLogin);
  useEffect(() => {
    if (userInfo && userInfo.admin) {
      dispatch(getAdminOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);
  return (
    <Container>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>NAME</th>
              <th>Date</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => {
                const {
                  _id,
                  user: { name },
                  createdAt,
                  isPaid,
                  paidAt,
                  isDelivered,
                  deliveredAt,
                  totalPrice,
                } = order;
                return (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{createdAt}</td>
                    <td>{totalPrice}</td>
                    {isPaid ? (
                      <td>{paidAt.substring(0, 10)} </td>
                    ) : (
                      <td>
                        {" "}
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      </td>
                    )}

                    {isDelivered ? (
                      <td>{deliveredAt.substring(0, 10)}</td>
                    ) : (
                      <td>
                        {" "}
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      </td>
                    )}

                    <td>
                      <Link to={`/order/${_id}`}>
                        <Button variant="light" className="btn-sm">
                          Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default OrdersScreen;
