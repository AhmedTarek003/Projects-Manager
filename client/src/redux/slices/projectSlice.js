import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  project: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    getAllprojects(state, action) {
      state.projects = action.payload;
    },
    getproject(state, action) {
      state.project = action.payload;
    },
    deleteproject(state, action) {
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload._id
      );
    },
  },
});

const projectActions = projectSlice.actions;
const projectReducer = projectSlice.reducer;

export { projectActions, projectReducer };
