import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: localStorage.getItem("username") || null, // Load from localStorage
  password: localStorage.getItem("password") || null, // Load from localStorage
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true", // Load from localStorage
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.isLoggedIn = true;

      // Store the user data in localStorage
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("password", action.payload.password);
      localStorage.setItem("isLoggedIn", "true");
    },
    logOut(state) {
      state.username = null;
      state.password = null;
      state.isLoggedIn = false;

      // Remove user data from localStorage on logout
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("isLoggedIn");
    },
    loginUser(state, action) {
      // Validate login with stored data
      if (
        state.username === action.payload.username &&
        state.password === action.payload.password
      ) {
        state.isLoggedIn = true; // Successfully logged in
      } else {
        state.isLoggedIn = false; // Invalid credentials
      }
    },
  },
});

export const { setUser, logOut, loginUser } = userSlice.actions;
export default userSlice.reducer;
