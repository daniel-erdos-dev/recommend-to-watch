"use client";

import React from "react";
import { useAppSelector } from "../../redux/hooks";
import RecommendedMovie from "../commonComponents/RecommendedMovie";

const RecommendedMovieList = () => {
  const isLocalhost = window.location.origin.startsWith("http://localhost");

  const recommendedMoviesCgpt = useAppSelector(
    (state) => state.movies.recommendedMoviesCgpt
  );
  const recommendedMoviesTmdb = useAppSelector(
    (state) => state.movies.recommendedMoviesTmdb
  );

  return isLocalhost
    ? recommendedMoviesCgpt.map((recommendedMovie) => (
        <RecommendedMovie
          key={`${recommendedMovie.title},${recommendedMovie.year}`}
          title={recommendedMovie.title}
          year={recommendedMovie.year}
        />
      ))
    : recommendedMoviesTmdb.map((recommendedMovie) => (
        <RecommendedMovie
          key={recommendedMovie.id}
          title={recommendedMovie.title}
          year={new Date(recommendedMovie.release_date).getFullYear()}
          id={recommendedMovie.id}
        />
      ));
};

export default RecommendedMovieList;
