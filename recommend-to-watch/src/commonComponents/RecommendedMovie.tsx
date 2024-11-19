"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import {
  loadRecommendedMovieData,
  selectRecommendedMovie,
} from "@/redux/reducers/movieReducer";
import { getMovieDetails } from "@/app/apiLogic/apiHelpers";
import { apiCallEnded, apiCallStarted } from "@/redux/reducers/apiReducer";

const RecommendedMovie: FC<RecommendedMovieProps> = ({ title, year }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // set this movie as selected recommended movie in store based on title and year
    dispatch(selectRecommendedMovie({ title, year }));
    // make request for details
    dispatch(apiCallStarted());
    const details = await getMovieDetails(title, year);
    // store details in store
    dispatch(apiCallEnded());
    dispatch(loadRecommendedMovieData(details[0]));
    router.push("/selectRegion");
  }

  return (
    <main className="flex gap-8 row-start-2 smallMain">
      <div>
        <div>
          <h1>{title}</h1>
          <h3>{year}</h3>
        </div>
        <button onClick={handleClick} className="whereToWatchButton">
          Where can I watch?
        </button>
      </div>
    </main>
  );
};

type RecommendedMovieProps = {
  title: string;
  year: number;
};

export default RecommendedMovie;
