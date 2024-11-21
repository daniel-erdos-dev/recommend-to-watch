"use client";

import Spinner from "../commonComponents/Spinner";
import { useAppSelector } from "../../redux/hooks";
import dynamic from "next/dynamic";

const RecommendedMovieListWithNoSSR = dynamic(
  () => import("./RecommendedMovieList"),
  { ssr: false }
);

// Show the movies recommended by ChatGPT
const RecommendedMoviesPage = () => {
  const apiCallInProgress = useAppSelector(
    (state) => state.api.apiCallsInProgress
  );

  return (
    <div className="items-center justify-items-center min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main
        className="flex gap-8 row-start-2 items-center sm:items-start"
        id="recMoviesContainer"
      >
        {apiCallInProgress ? <Spinner /> : <RecommendedMovieListWithNoSSR />}
      </main>
    </div>
  );
};

export default RecommendedMoviesPage;
