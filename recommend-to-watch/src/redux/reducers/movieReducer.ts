import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../configureStore";

interface MovieState {
  movieList: [
    {
      id: number;
      overview: string;
      poster_path: string;
      release_date: string;
      title: string;
    }
  ];
  selectedMovie: {
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
  };
  searchMovieTitle: string;
  recommendedMovies: [
    {
      title: string;
      year: number;
    }
  ];
  selectedRecommendedMovie: {
    title: string;
    year: number;
  };
  recommendedMovieData: {
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
  };
}

const emptyMovie = {
  id: 0,
  overview: "",
  poster_path: "",
  release_date: "",
  title: "",
};

const initialState: MovieState = {
  movieList: [emptyMovie],
  selectedMovie: emptyMovie,
  searchMovieTitle: "",
  recommendedMovies: [{ title: "", year: 0 }],
  selectedRecommendedMovie: { title: "", year: 0 },
  recommendedMovieData: emptyMovie,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    loadMovies: (
      state,
      action: PayloadAction<
        [
          {
            id: number;
            overview: string;
            poster_path: string;
            release_date: string;
            title: string;
          }
        ]
      >
    ) => {
      state.movieList = action.payload;
    },
    selectMovie: (
      state,
      action: PayloadAction<{
        id: number;
        overview: string;
        poster_path: string;
        release_date: string;
        title: string;
      }>
    ) => {
      state.selectedMovie = action.payload;
    },
    setSearchMovieTitle: (state, action: PayloadAction<string>) => {
      state.searchMovieTitle = action.payload;
    },
    getRecommendedMovies: (
      state,
      action: PayloadAction<[{ title: string; year: number }]>
    ) => {
      state.recommendedMovies = action.payload;
    },
    loadRecommendedMovieData: (
      state,
      action: PayloadAction<{
        id: number;
        overview: string;
        poster_path: string;
        release_date: string;
        title: string;
      }>
    ) => {
      state.recommendedMovieData = action.payload;
    },
    selectRecommendedMovie: (
      state,
      action: PayloadAction<{
        title: string;
        year: number;
      }>
    ) => {
      state.selectedRecommendedMovie = action.payload;
    },
  },
});

export const {
  loadMovies,
  selectMovie,
  setSearchMovieTitle,
  getRecommendedMovies,
  loadRecommendedMovieData,
  selectRecommendedMovie,
} = movieSlice.actions;

export const selectMovieList = (state: RootState) => state.movies.movieList;
export const selectSelectedMovie = (state: RootState) =>
  state.movies.selectedMovie;
export const selectSearchMovieTitle = (state: RootState) =>
  state.movies.searchMovieTitle;
export const selectRecommendedMovies = (state: RootState) =>
  state.movies.recommendedMovies;
export const selectRecommendedMovieData = (state: RootState) =>
  state.movies.recommendedMovieData;
export const selectSelectedRecommendedMovie = (state: RootState) =>
  state.movies.selectedRecommendedMovie;

export default movieSlice.reducer;
