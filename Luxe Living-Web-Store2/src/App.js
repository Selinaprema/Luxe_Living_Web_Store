import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Products from "./components/ProductPage";
import Cart from "./components/CartPage";
import Register from "./components/RegisterForm";
import Login from "./components/LoginPage";

import { store, persistor } from "./redux/store";

function App() {
  return (
    // Wrapping the entire app in the Redux Provider component to provide the store
    <Provider store={store}>
      {/*  maintains the application state even after a browser refresh */}
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
