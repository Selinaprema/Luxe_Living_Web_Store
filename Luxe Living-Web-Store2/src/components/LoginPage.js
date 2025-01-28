import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import hooks for interacting with Redux store
import { logOut, loginUser } from "../redux/Slices/userSlice"; // Import actions for login and logout from Redux slice
import {
  Button,
  Container,
  Row,
  Col,
  Form as BootstrapForm,
} from "react-bootstrap";
import "../Styling/LoginPage.css";

const LoginPage = () => {
  // Initialise dispatch function to send actions to Redux
  const dispatch = useDispatch();

  // Get the user state (username, password, login status) from the Redux store
  const { username, password, isLoggedIn } = useSelector((state) => state.user);

  // Local state for storing user input and error message
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message for invalid login

  // Handle form submission when user attempts to login
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Check if entered username and password match the stored ones
    if (enteredUsername === username && enteredPassword === password) {
      // Dispatch the loginUser action to store user input in Redux store
      dispatch(
        loginUser({ username: enteredUsername, password: enteredPassword })
      );
      setErrorMessage(""); // Clear any previous error message
    } else {
      setErrorMessage("Invalid username or password"); // incorrect details error message
    }
  };

  // Handle user logout
  const handleLogout = () => {
    dispatch(logOut()); // Dispatch the logout action to reset the user data in Redux store
    setEnteredUsername(""); // Clear entered username
    setEnteredPassword(""); // Clear entered password
  };

  return (
    <Container fluid className="mt-5">
      <Row className="full-height">
        <Col md={6} className="image-column">
          <img
            src={require("../components/Page_Images/Login_Page_Image.jpg")}
            className="img-fluid" // Make the image responsive
          />
        </Col>

        <Col md={6} className="form-column">
          {!isLoggedIn ? (
            // If user is not logged in, show the login form
            <>
              <h1>Login</h1>

              {/* error message if login fails */}
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}

              {/* Login form */}
              <form onSubmit={handleSubmit}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Username</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    placeholder="Enter username"
                    value={enteredUsername} // Bind state to form input
                    onChange={(event) => setEnteredUsername(event.target.value)} // Update entered Username on input change
                  />
                </BootstrapForm.Group>

                {/* Password field */}
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Password</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="password"
                    placeholder="Enter password"
                    value={enteredPassword} // Bind state to form input
                    onChange={(event) => setEnteredPassword(event.target.value)} // Update enteredPassword on input change
                  />
                </BootstrapForm.Group>

                <Button type="submit" className="dark-grey-btn">
                  Login
                </Button>
              </form>
            </>
          ) : (
            // If user is logged in, show welcome message and logout button
            <div className="welcome-container">
              <h1>Welcome, {username}!</h1>{" "}
              <p>You have successfully logged in.</p>
              <Button onClick={handleLogout} className="dark-grey-btn">
                Log out
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
