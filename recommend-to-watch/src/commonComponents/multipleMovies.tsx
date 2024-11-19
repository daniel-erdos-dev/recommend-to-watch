"use client";

import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Movie from "./Movie";
import React, { FC } from "react";
import {
  getRecommendedMovies,
  selectMovie,
} from "@/redux/reducers/movieReducer";
import { getRecommendations } from "@/app/apiLogic/apiHelpers";
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
        const recs = await getRecommendations(
          selected.title,
          selected.release_date
        );
        dispatch(getRecommendedMovies(recs));
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
    <main className="flex gap-8 row-start-2 movieContainer">
      {movies.map((movie) => {
        const movieProps = {
          id: movie.id,
          overview: movie.overview,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          title: movie.title,
        };
        return (
          <div key={movie.id} className="movieChoiceContainer">
            <Movie {...movieProps} />
            <button
              onClick={handleClick}
              className="chooseThisButton"
              id={movie.id.toString()}
            >
              Choose this Movie
            </button>
          </div>
        );
      })}
    </main>
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
