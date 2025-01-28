import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/Slices/userSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  Row,
  Col,
  Form as BootstrapForm,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "../Styling/RegistrationForm.css";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // New state for success message
  const navigate = useNavigate(); // Initialise navigate

  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Surname is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one uppercase letter")
      .matches(/[A-Z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });

  // Form submission handler
  const handleSubmit = (values, { resetForm }) => {
    console.log("Registration successful:", values); // log the form data

    dispatch(setUser({ username: values.username, password: values.password }));

    setIsRegistered(true);
    resetForm(); // clear the form fields

    setShowSuccess(true); // Show success message

    // Redirect after a delay to the login page
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/login");
    }, 2000);
  };

  return (
    <Container fluid className="mt-5">
      <Row className="full-height">
        <Col md={6} className="image-column">
          <img
            src={require("../components/Page_Images/Register_Page_Image.jpg")}
            alt="Registration"
            className="img-fluid"
          />
        </Col>

        <Col md={6} className="form-column">
          <h1>Register</h1>

          {showSuccess && (
            <div className="alert alert-success">
              Registration Successful! Redirecting to login...
            </div>
          )}

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>First Name</BootstrapForm.Label>
                <Field type="text" name="firstName" className="form-control" />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Surname</BootstrapForm.Label>
                <Field type="text" name="lastName" className="form-control" />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Username</BootstrapForm.Label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Email Address</BootstrapForm.Label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Password</BootstrapForm.Label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <Button type="submit" className="dark-grey-btn">
                Register
              </Button>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationPage;
