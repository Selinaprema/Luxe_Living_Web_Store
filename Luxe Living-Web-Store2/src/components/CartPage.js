import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../redux/Slices/cartSlice";

import { Button, Modal } from "react-bootstrap";
import "../Styling/CartPage.css";

const CartPage = () => {
  // Dispatch and selector hooks for Redux state
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); // Get cart state from Redux store

  // State for handling the selected shipment method (Default: Standard Shipping)
  const [shipmentMethod, setShipmentMethod] = useState("Standard Shipping");

  // State for showing the help modal (Help about shipping options)
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Function to remove an item from the cart
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id)); // Dispatch the action to remove an item from the cart
  };

  // Function to handle changes in shipment method
  const handleShipmentChange = (event) => {
    setShipmentMethod(event.target.value); // Update the shipment method based on user selection
  };

  // Function to show the help modal
  const handleShowHelp = () => {
    setShowHelpModal(true); // Set modal visibility to true to show it
  };

  // Function to close the help modal
  const handleCloseHelp = () => {
    setShowHelpModal(false); // Set modal visibility to false to hide it
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {/* Conditional rendering based on whether there are items in the cart */}
      {cart.items.length > 0 ? (
        <div className="cart-items">
          {/* Iterate over the items in the cart and display them */}
          {cart.items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.title} />

              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Price: £{item.price}</p>
                <p>Colour: {item.selectedColour || "Not Selected"}</p>
              </div>

              {/* Button to remove item from the cart */}
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
          {/* Display total price */}
          <div className="total-price">
            <h2>Total: £{cart.totalPrice}</h2>
          </div>

          {/* Shipment method selection */}
          <div className="shipment-method">
            <label htmlFor="shipment">Choose a shipment method:</label>
            <select
              id="shipment"
              value={shipmentMethod}
              onChange={handleShipmentChange} // Update shipment method when selection changes
            >
              {/* Available shipment options */}
              <option value="Standard Shipping">Standard Shipping</option>
              <option value="Express Shipping">Express Shipping</option>
              <option value="Next-Day Shipping">Next-Day Shipping</option>
            </select>
          </div>

          {/* Help Button */}
          <div className="help-button">
            <Button onClick={handleShowHelp}>Help with Shipping Options</Button>
          </div>
        </div>
      ) : (
        // If cart is empty, show an empty cart message
        <p className="empty-cart-message">Your cart is empty.</p>
      )}

      {/* Help Modal to explain shipment methods */}
      <Modal show={showHelpModal} onHide={handleCloseHelp}>
        <Modal.Header closeButton>
          <Modal.Title>Shipping Options Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              <strong>Standard Shipping</strong>: 5-7 business days. Free
              shipping on orders over £50.
            </li>
            <li>
              <strong>Express Shipping</strong>: 2-3 business days. Additional
              £15 charge.
            </li>
            <li>
              <strong>Next-Day Shipping</strong>: Delivery by the next business
              day. Additional £30 charge.
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseHelp}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartPage;
