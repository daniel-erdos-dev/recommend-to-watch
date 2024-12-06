"use client";

import { useRouter } from "next/navigation";
import React, { FC } from "react";
import Movie from "./Movie";
import {
  getRecommendationsFromChatGPT,
  getRecommendationsFromTMDB,
} from "../../apiLogic/apiHelpers";
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
      try {
        const cgptRecs = await getRecommendationsFromChatGPT(
          title,
          release_date
        );
        dispatch(getRecommendedMoviesFromCgpt(cgptRecs!));
      } catch (error) {
        console.error(
          "Error happened while tried to get recommendations from chatGPT so getting recommendations from TMDB as a fallback. Error: " +
            error
        );
        const tmdbRecs = await getRecommendationsFromTMDB(id);
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

  function handleNoClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center">
        <h1 className="font-extrabold text-3xl" id="singleMovie-headerText">
          Is this the movie you thought about?
        </h1>
        <div className="p-5 bg-white rounded-lg shadow-lg mt-5">
          <Movie
            overview={overview}
            poster_path={poster_path}
            release_date={release_date}
            title={title}
          />
          <div className="flex justify-between">
            <button onClick={handleYesClick} id="singleMovie-yesButton">
              Yes
            </button>
            <button onClick={handleNoClick} id="singleMovie-noButton">
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
