import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
          <Link to="/" className="nav-link">
            HOME
          </Link>
          <Link to="/products" className="nav-link">
            PRODUCTS
          </Link>
          <Link to="/cart" className="nav-link">
            CART
          </Link>
          <Link to="/register" className="nav-link">
            REGISTER
          </Link>
          <Link to="/login" className="nav-link">
            LOGIN
          </Link>
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
