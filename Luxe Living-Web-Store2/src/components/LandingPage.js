import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import "../Styling/LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <div className="home-container">
        <div className="hero-image">
          <div className="hero-overlay"></div>
          <div className="content">
            <h1 className="hero-text">Luxury Home Decor</h1>
            <Link to="/products">
              <button className="browse-button">Browse Products</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="about-us-container">
        <h2> About Us </h2>
        <p>
          Welcome to LuxeLiving, where sophistication meets comfort. At
          LuxeLiving, we specialize in curating premium home interior products
          that elevate every corner of your space. From timeless furniture
          pieces to opulent decor accents, our collection is designed to blend
          elegance with functionality, helping you craft a home that reflects
          your refined taste. Discover the art of luxury living and let us
          transform your house into a haven of style and serenity.
        </p>
      </div>

      <div className="product-grid-container">
        <h2 className="product-grid-heading">Browse Our Collection</h2>

        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Sofas</Card.Title>
                <Card.Text>Comfort and style for your living room.</Card.Text>
                <Link to="/products">
                  <button className="browse-button">Shop Now</button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Mirrors</Card.Title>
                <Card.Text>Enhance your space with elegant mirrors.</Card.Text>
                <Link to="/products">
                  <button className="browse-button">Shop Now</button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Tables</Card.Title>
                <Card.Text>Perfectly crafted tables for your home.</Card.Text>
                <Link to="/products">
                  <button className="browse-button">Shop Now</button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LandingPage;
