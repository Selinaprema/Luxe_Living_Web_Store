import { createSlice } from "@reduxjs/toolkit";

// Initial state of the cart
const initialState = {
  items: [], // Array to hold cart items
  totalPrice: 0, // Total price of items in the cart
};

// Create a slice for the cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add an item to the cart
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        // If the item already exists in the cart, increment the quantity
        existingItem.quantity += 1;
      } else {
        // If the item doesn't exist, add it to the cart with quantity 1
        state.items.push({ ...item, quantity: 1 });
      }

      // Recalculate the total price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // Action to remove an item from the cart
    removeFromCart: (state, action) => {
      const id = action.payload;

      // Filter out the item to be removed from the cart
      state.items = state.items.filter((item) => item.id !== id);

      // Recalculate the total price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // Action to clear the entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },

    // Action to update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity = quantity;
      }

      // Recalculate the total price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

// Export actions to be used in components
export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

// Export the reducer to be included in the store
export default cartSlice.reducer;
