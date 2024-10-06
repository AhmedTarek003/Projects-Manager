import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { teamReducer } from "./slices/teamSlice";
import { projectReducer } from "./slices/projectSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    team: teamReducer,
    project: projectReducer,
  },
});
