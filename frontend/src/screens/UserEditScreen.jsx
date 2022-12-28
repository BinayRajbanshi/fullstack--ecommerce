import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getUserById, updateAdminUser } from "../actions/userActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

import React from "react";
import {
  USER_ADMIN_UPDATE_RESET,
  USER_SINGLE_RESET,
} from "../constants/userConstants";

const UserEditScreen = () => {
  const { userId } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((store) => store.userSingleById);
  const {
    loading: updateLoading,
    error: updateError,
    // updatedUser,
    success,
  } = useSelector((store) => store.userAdminUpdate);
  const updatedData = {
    name,
    email,
    isAdmin,
  };

  useEffect(() => {
    if (success) {
      dispatch({
        type: USER_ADMIN_UPDATE_RESET,
      });
      dispatch({
        type: USER_SINGLE_RESET,
      });
      navigate("/admin/users");
    } else {
      if (!user || user._id !== userId) {
        dispatch(getUserById(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setMsg("User Updated Successfully");
      }
    }
  }, [dispatch, userId, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateAdminUser(updatedData, userId));
  };

  return (
    <FormContainer>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go Back
      </Link>
      <h1>Edit User</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {updateLoading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="mb-4">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="mb-4">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="isadmin" className="mb-4">
          <Form.Check
            type="checkbox"
            label="Appoint as Admin ?"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </Form.Group>

        {updateError && <Message variant="danger">{updateError}</Message>}
        {success && <Message variant="success">{msg}</Message>}

        <Button type="submit" variant="primary">
          Update User
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UserEditScreen;
