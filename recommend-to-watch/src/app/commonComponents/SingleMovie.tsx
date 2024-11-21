"use client";

import { useRouter } from "next/navigation";
import React, { FC } from "react";
import Movie from "./Movie";
import { getRecommendations } from "../../apiLogic/apiHelpers";
import { useAppDispatch } from "../../redux/hooks";
import {
  getRecommendedMoviesFromCgpt,
  getRecommendedMoviesFromTmdb,
} from "../../redux/reducers/movieReducer";
import { apiCallEnded, apiCallStarted } from "../../redux/reducers/apiReducer";

const SingleMovie: FC<SingleMovieProps> = ({
  overview,
  poster_path,
  release_date,
  title,
  id,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleYesClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    try {
      dispatch(apiCallStarted());
      const recs = await getRecommendations(title, release_date, id);
      dispatch(apiCallEnded());

      if (window.location.origin.startsWith("http://localhost")) {
        dispatch(getRecommendedMoviesFromCgpt(recs));
      } else {
        dispatch(getRecommendedMoviesFromTmdb(recs));
      }

      router.push("/recommendedMovies");
    } catch (err) {
      console.error(
        "Error while tried to get and navigate to recommendations: " + err
      );
    }
  }

  function handleNoClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center">
        <h1 className="mainQuestion">Is this the movie you thought about?</h1>
        <div className="singleMovieContainer">
          <Movie
            overview={overview}
            poster_path={poster_path}
            release_date={release_date}
            title={title}
          />
          <div className="chooseButtonsContainer">
            <button
              onClick={handleYesClick}
              className="chooseButtons truthyButton"
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className="chooseButtons falsyButton"
            >
              No
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

type SingleMovieProps = {
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  id: number;
};

export default SingleMovie;
