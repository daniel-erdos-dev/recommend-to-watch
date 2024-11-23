"use client";

import Spinner from "../commonComponents/Spinner";
import { useAppSelector } from "@/redux/hooks";
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
    <div className="min-h-min sm:p-10 font-[family-name:var(--font-geist-sans)] flex">
      <main className="gap-10 flex justify-evenly flex-wrap">
        {apiCallInProgress ? <Spinner /> : <RecommendedMovieListWithNoSSR />}
      </main>
    </div>
  );
};

export default RecommendedMoviesPage;
