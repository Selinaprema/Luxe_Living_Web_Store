import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/Slices/cartSlice";
import { useSelector } from "react-redux";
import { Card, Button, DropdownButton, Dropdown } from "react-bootstrap";
import "../Styling/ProductPage.css";
import sofaImage from "./Product_Images/sofa.jpg";
import diningTableImage from "./Product_Images/dining_table.webp";
import coffeeTableImage from "./Product_Images/coffee_table.jpg";
import armchairImage from "./Product_Images/armchair.jpg";
import wallMirrorImage from "./Product_Images/mirror.webp";
import lampshadeImage from "./Product_Images/lampshade.webp";
import rugImage from "./Product_Images/rug.jpg";
import basketImage from "./Product_Images/basket.webp";
import curtainImage from "./Product_Images/curtains.webp";
import bookcaseImage from "./Product_Images/bookcase.jpg";

// Product data array
const products = [
  {
    id: 1,
    title: "Luxury Sofa",
    price: 1200,
    description: "A comfortable and stylish luxury sofa for your living room.",
    imageUrl: sofaImage,
    colours: ["Grey", "Beige", "Charcoal"],
  },
  {
    id: 2,
    title: "Dining Table Set",
    price: 450,
    description: "A beautiful dining table set with matching chairs.",
    imageUrl: diningTableImage,
    colours: ["Oak", "White", "Black"],
  },
  {
    id: 3,
    title: "Coffee Table",
    price: 250,
    description: "A sleek and modern coffee table for your living room.",
    imageUrl: coffeeTableImage,
    colours: ["Natural Wood", "White", "Gold"],
  },
  {
    id: 4,
    title: "Armchair",
    price: 200,
    description: "A stylish armchair perfect for any corner of your home.",
    imageUrl: armchairImage,
    colours: ["Yellow", "Grey", "Blue"],
  },
  {
    id: 5,
    title: "Wall Mirror",
    price: 80,
    description: "A decorative wall mirror that fits in any room.",
    imageUrl: wallMirrorImage,
    colours: ["Gold", "Silver", "Black"],
  },
  {
    id: 6,
    title: "Lampshade",
    price: 60,
    description:
      "A modern lampshade that creates a warm ambiance in your room.",
    imageUrl: lampshadeImage,
    colours: ["White", "Natural", "Gold"],
  },
  {
    id: 7,
    title: "Area Rug",
    price: 350,
    description: "A plush area rug to bring warmth and color to your home.",
    imageUrl: rugImage,
    colours: ["Beige", "Navy Blue", "Dark Grey"],
  },
  {
    id: 8,
    title: "Storage Basket",
    price: 20,
    description: "A functional and stylish storage basket for your home.",
    imageUrl: basketImage,
    colours: ["Blue", "Lilac", "Brown"],
  },
  {
    id: 9,
    title: "Curtains",
    price: 100,
    description: "A set of curtains to add privacy and style to your windows.",
    imageUrl: curtainImage,
    colours: ["Mustard", "Burgundy", "Teal"],
  },
  {
    id: 10,
    title: "Bookcase",
    price: 750,
    description: "A spacious and sturdy bookcase to store your favorite books.",
    imageUrl: bookcaseImage,
    colours: ["Blue", "White", "Natural"],
  },
];

const ProductsPage = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions to Redux
  const [selectedColours, setSelectedColours] = useState({}); // Track selected colors
  const [dropdownOpen, setDropdownOpen] = useState({}); // Track dropdown states

  // Access cart state from Redux (Debugging purposes)
  const cart = useSelector((state) => state.cart);

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    const color = selectedColours[product.id] || "Default Color";
    dispatch(addToCart({ ...product, selectedColour: color })); // Add selected color to the product
  };

  // Function to handle color selection
  const handleColourSelect = (productId, colour) => {
    setSelectedColours({ ...selectedColours, [productId]: colour });
    setDropdownOpen({ ...dropdownOpen, [productId]: false }); // Close the dropdown
  };

  // Toggle dropdown state
  const toggleDropdown = (productId, isOpen) => {
    setDropdownOpen({
      ...dropdownOpen,
      [productId]: isOpen,
    });
  };

  return (
    <div>
      <h1> Our Products</h1>
      <div className="product-grid">
        {/* Iterate over the products array to display each product in a Card component */}
        {products.map((product) => (
          <Card key={product.id} style={{ width: "18rem", margin: "20px" }}>
            <Card.Img src={product.imageUrl} alt={product.title} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>

              <Card.Text>{product.description}</Card.Text>

              <Card.Text>Price: £{product.price}</Card.Text>

              <DropdownButton
                className="dropdown-btn"
                id={`dropdown-button-${product.id}`}
                title={selectedColours[product.id] || "Select Color"}
                show={dropdownOpen[product.id] || false}
                onToggle={(isOpen) => toggleDropdown(product.id, isOpen)}
              >
                {product.colours.map((colour, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleColourSelect(product.id, colour)}
                  >
                    {colour}
                  </Dropdown.Item>
                ))}
              </DropdownButton>

              <Button
                className="dark-grey-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
