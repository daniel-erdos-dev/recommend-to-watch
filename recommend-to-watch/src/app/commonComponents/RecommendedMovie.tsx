"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  loadRecommendedMovieData,
  selectRecommendedMovie,
} from "@/redux/reducers/movieReducer";
import { getMovieDetails, getProviders } from "@/apiLogic/apiHelpers";
import { apiCallEnded, apiCallStarted } from "@/redux/reducers/apiReducer";
import { getProviderInfo } from "@/redux/reducers/providerReducer";

const RecommendedMovie: FC<RecommendedMovieProps> = ({ title, year, id }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const recommendedMoviesTmdb = useAppSelector(
    (state) => state.movies.recommendedMoviesTmdb
  );

  const recommendedMoviesCgpt = useAppSelector(
    (state) => state.movies.recommendedMoviesCgpt
  );

  const selectedCountry = useAppSelector(
    (state) => state.provider.selectedCountry
  );

  const recommendedMovie = useAppSelector(
    (state) => state.movies.recommendedMovieData
  );

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const areRecommendationsFromCgpt = recommendedMoviesCgpt.length > 0;

    if (areRecommendationsFromCgpt) {
      // set this movie as selected recommended movie in store based on title and year
      dispatch(selectRecommendedMovie({ title, year }));
      // make request for details
      dispatch(apiCallStarted());
      const details = await getMovieDetails(title, year);
      // store details in store
      dispatch(apiCallEnded());
      dispatch(loadRecommendedMovieData(details[0]));
    } else {
      const selectedMovie = recommendedMoviesTmdb.find(
        (movie) => movie.id === id
      );
      if (selectedMovie) {
        dispatch(loadRecommendedMovieData(selectedMovie));
      }
    }

    if (selectedCountry) {
      dispatch(apiCallStarted());
      const providers = await getProviders(
        recommendedMovie.id,
        selectedCountry
      );
      dispatch(apiCallEnded());
      // store provider info in store
      dispatch(getProviderInfo(providers));
      router.push(`/recommendedMovie/${encodeURI(recommendedMovie.title)}`);
    } else {
      router.push("/selectRegion");
    }
  }

  return (
    <div className="flex flex-col p-5 bg-white rounded-lg shadow-lg">
      <div>
        <h1 className="text-lg font-bold">{title}</h1>
        <h3 className="text-sm font-semibold">{year}</h3>
      </div>
      <button onClick={handleClick}>Where can I watch?</button>
    </div>
  );
};

type RecommendedMovieProps = {
  title: string;
  year: number;
  id?: number;
};

export default RecommendedMovie;
