import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAllUsers(state, action) {
      state.users = action.payload;
    },
    deleteUser(state, action) {
      state.users = state.users.filter(
        (user) => user._id !== action.payload._id
      );
    },
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };
