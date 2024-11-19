import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../configureStore";

interface apiState {
  apiCallsInProgress: boolean;
}

const initialState: apiState = {
  apiCallsInProgress: false,
};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    apiCallStarted: (state) => {
      state.apiCallsInProgress = true;
    },
    apiCallEnded: (state) => {
      state.apiCallsInProgress = false;
    },
  },
});

export const { apiCallStarted, apiCallEnded } = apiSlice.actions;

export const selectApiCallsInProgress = (state: RootState) =>
  state.api.apiCallsInProgress;

export default apiSlice.reducer;
