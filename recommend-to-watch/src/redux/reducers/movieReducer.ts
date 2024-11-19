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
  recommendedMoviesCgpt: [
    {
      title: string;
      year: number;
    }
  ];
  recommendedMoviesTmdb: [
    {
      id: number;
      overview: string;
      poster_path: string;
      release_date: string;
      title: string;
    }
  ];
  selectedRecommendedMovieCgpt: {
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
  recommendedMoviesCgpt: [{ title: "", year: 0 }],
  recommendedMoviesTmdb: [emptyMovie],
  selectedRecommendedMovieCgpt: { title: "", year: 0 },
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
    getRecommendedMoviesFromCgpt: (
      state,
      action: PayloadAction<[{ title: string; year: number }]>
    ) => {
      state.recommendedMoviesCgpt = action.payload;
    },
    getRecommendedMoviesFromTmdb: (
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
      state.recommendedMoviesTmdb = action.payload;
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
      state.selectedRecommendedMovieCgpt = action.payload;
    },
  },
});

export const {
  loadMovies,
  selectMovie,
  setSearchMovieTitle,
  getRecommendedMoviesFromCgpt,
  getRecommendedMoviesFromTmdb,
  loadRecommendedMovieData,
  selectRecommendedMovie,
} = movieSlice.actions;

export const selectMovieList = (state: RootState) => state.movies.movieList;
export const selectSelectedMovie = (state: RootState) =>
  state.movies.selectedMovie;
export const selectSearchMovieTitle = (state: RootState) =>
  state.movies.searchMovieTitle;
export const selectRecommendedMoviesCgpt = (state: RootState) =>
  state.movies.recommendedMoviesCgpt;
export const selectRecommendedMovieData = (state: RootState) =>
  state.movies.recommendedMovieData;
export const selectSelectedRecommendedMovieCgpt = (state: RootState) =>
  state.movies.selectedRecommendedMovieCgpt;

export default movieSlice.reducer;
