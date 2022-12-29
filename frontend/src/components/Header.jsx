import React from "react";
import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import { ORDER_MYLIST_RESET } from "../constants/orderConstants";
import {
  USER_DETAILS_RESET,
  USER_UPDATE_RESET,
  USER_LIST_RESET,
} from "../constants/userConstants";
import SearchBox from "./SearchBox";

function Header() {
  const dispatch = useDispatch();
  const { userInfo: infoLogin } = useSelector((store) => store.userLogin);
  const { userInfo: infoRegister } = useSelector((store) => store.userRegister);

  let user_info;
  if (!infoLogin) {
    user_info = infoRegister;
  } else {
    user_info = infoLogin;
  }

  const logoutHandler = () => {
    dispatch(logout());
    dispatch({
      type: ORDER_MYLIST_RESET,
    });
    dispatch({
      type: USER_DETAILS_RESET,
    });
    dispatch({
      type: USER_UPDATE_RESET,
    });
    dispatch({
      type: USER_LIST_RESET,
    });
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Queen Bee
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <AiOutlineShoppingCart className="me-1 mb-1" />
                Cart
              </Nav.Link>
              {/* {`${user_info.name}`} */}
              {user_info ? (
                <NavDropdown
                  title={
                    user_info.admin
                      ? `${user_info.name} (Admin)`
                      : `${user_info.name}`
                  }
                  id="username"
                >
                  {user_info.admin ? (
                    <NavDropdown.Item as={Link} to="/admin/users">
                      Users
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                  )}
                  {user_info && user_info.admin && (
                    <>
                      <NavDropdown.Item as={Link} to="admin/products">
                        Products
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="admin/orders">
                        Orders
                      </NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <AiOutlineUserAdd className="me-1 mb-1" />
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
