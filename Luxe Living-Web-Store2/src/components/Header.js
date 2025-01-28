import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Button } from "react-bootstrap";
import { logOut } from "../redux/Slices/userSlice"; // Import logout action
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for redirecting after logout
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styling/Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { username, isLoggedIn } = useSelector((state) => state.user);

  // Log Out handler
  const handleLogOut = () => {
    dispatch(logOut()); // Dispatch the logOut action to reset the user data in Redux
    navigate("/login"); // Redirect the user to the login page after logging out
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav className="me-auto">
          <Nav.Link href="/">HOME</Nav.Link>
          <Nav.Link href="/products">PRODUCTS</Nav.Link>
          <Nav.Link href="/cart">CART</Nav.Link>
          <Nav.Link href="/register">REGISTER</Nav.Link>
          <Nav.Link href="/login">LOGIN</Nav.Link>
        </Nav>

        {/* Conditional rendering: display user's info and log out button if logged in */}
        {isLoggedIn && username && (
          <>
            <Navbar.Text className="text-white">
              Signed in as: {username}
            </Navbar.Text>
            <Button
              variant="outline-light"
              onClick={handleLogOut}
              className="ms-2"
            >
              Log Out
            </Button>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
