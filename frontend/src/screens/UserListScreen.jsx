// import { useEffect } from "react";
// import { Button, Table } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// import { Link } from "react-router-dom";
// import { listUsers } from "../actions/userActions";

// const UserListScreen = () => {
//   const dispatch = useDispatch();

//   const { loading, error, users } = useSelector((store) => store.userList);

//   useEffect(() => {
//     dispatch(listUsers());
//   }, [dispatch]);

//   const deleteHandler = (id) => {
//     console.log("handles the delete");
//   };

//   return (
//     <>
//       <h1>Users</h1>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <Table striped bordered hover responsive className="table-sm">
//           <thead>
//             <tr>ID</tr>
//             <tr>NAME</tr>
//             <tr>EMAIL</tr>
//             <tr>ADMIN</tr>
//           </thead>
//           <tbody>
//             {users.map((user) => {
//               return (
//                 <tr key={user._id}>
//                   <td>{user._id}</td>
//                   <td>{user.name}</td>
//                   <td>
//                     <a href={`mailto:${user.email}`}>{user.email}</a>
//                   </td>
//                   <td>
//                     {user.isAdmin ? (
//                       <i
//                         className="fas fa-check"
//                         style={{ color: "green" }}
//                       ></i>
//                     ) : (
//                       <i className="fas fa-times" style={{ color: "red" }}></i>
//                     )}
//                   </td>
//                   <td>
//                     <Button
//                       variant="danger"
//                       className="btn-sm"
//                       onClick={() => deleteHandler(user._id)}
//                     >
//                       <i className="fas fa-trash"></i>
//                     </Button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       )}
//     </>
//   );
// };

// export default UserListScreen;
