import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams: [],
  team: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    getAllteams(state, action) {
      state.teams = action.payload;
    },
    getTeam(state, action) {
      state.team = action.payload;
    },
    deleteteam(state, action) {
      state.teams = state.teams.filter(
        (team) => team._id !== action.payload._id
      );
    },
  },
});

const teamActions = teamSlice.actions;
const teamReducer = teamSlice.reducer;

export { teamActions, teamReducer };
