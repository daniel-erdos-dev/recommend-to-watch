"use client";

import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Movie from "./Movie";
import React, { FC } from "react";
import {
  getRecommendedMoviesFromCgpt,
  getRecommendedMoviesFromTmdb,
  selectMovie,
} from "@/redux/reducers/movieReducer";
import {
  getRecommendationsFromChatGPT,
  getRecommendationsFromTMDB,
} from "@/apiLogic/apiHelpers";
import { apiCallEnded, apiCallStarted } from "@/redux/reducers/apiReducer";

const MultipleMovies: FC<MultipleMovieProps> = ({ movies }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const findSelectedMovie = movies.find(
      (movie) => movie.id.toString() === event.currentTarget.id
    );

    if (findSelectedMovie) {
      const selected = {
        id: findSelectedMovie.id,
        overview: findSelectedMovie.overview,
        poster_path: findSelectedMovie.poster_path,
        release_date: findSelectedMovie.release_date,
        title: findSelectedMovie.title,
      };
      dispatch(selectMovie(selected));

      try {
        dispatch(apiCallStarted());
        try {
          const cgptRecs = await getRecommendationsFromChatGPT(
            selected.title,
            selected.release_date
          );
          dispatch(getRecommendedMoviesFromCgpt(cgptRecs!));
        } catch (error) {
          console.error(
            "Error happened while tried to get recommendations from chatGPT so getting recommendations from TMDB as a fallback. Error: " +
              error
          );
          const tmdbRecs = await getRecommendationsFromTMDB(selected.id);
          dispatch(getRecommendedMoviesFromTmdb(tmdbRecs));
        }

        dispatch(apiCallEnded());

        router.push("/recommendedMovies");
      } catch (err) {
        console.error(
          "Error while tried to get and navigate to recommendations: " + err
        );
      }
    }
  }

  return (
    <div className="flex gap-8 flex-wrap mt-10 ml-10 justify-evenly">
      {movies.map((movie) => {
        const movieProps = {
          id: movie.id,
          overview: movie.overview,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          title: movie.title,
        };
        return (
          <div
            key={movie.id}
            className="flex flex-col justify-between p-5 bg-white rounded-lg shadow-lg"
          >
            <Movie {...movieProps} />
            <button
              onClick={handleClick}
              className="flex justify-center"
              id={movie.id.toString()}
            >
              Choose this Movie
            </button>
          </div>
        );
      })}
    </div>
  );
};

type MultipleMovieProps = {
  movies: {
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
  }[];
};

export default MultipleMovies;
