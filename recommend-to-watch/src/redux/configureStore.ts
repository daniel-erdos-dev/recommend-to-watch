import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./reducers/movieReducer";
import { apiSlice } from "./reducers/apiReducer";
import { providerSlice } from "./reducers/providerReducer";

export const store = configureStore({
  reducer: {
    movies: movieSlice.reducer,
    api: apiSlice.reducer,
    provider: providerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
