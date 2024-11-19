"use client";

import RecommendedMovie from "../commonComponents/RecommendedMovie";
import Spinner from "../commonComponents/Spinner";
import { useAppSelector } from "@/redux/hooks";

// Show the movies recommended by ChatGPT
const RecommendedMoviesPage = () => {
  const isLocalhost = document.location.hostname === "localhost";
  const recommendedMoviesCgpt = useAppSelector(
    (state) => state.movies.recommendedMoviesCgpt
  );
  const recommendedMoviesTmdb = useAppSelector(
    (state) => state.movies.recommendedMoviesTmdb
  );
  const apiCallInProgress = useAppSelector(
    (state) => state.api.apiCallsInProgress
  );

  return (
    <div className="items-center justify-items-center min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main
        className="flex gap-8 row-start-2 items-center sm:items-start"
        id="recMoviesContainer"
      >
        {apiCallInProgress ? (
          <Spinner />
        ) : isLocalhost ? (
          recommendedMoviesCgpt.map((recommendedMovie) => (
            <RecommendedMovie
              key={`${recommendedMovie.title},${recommendedMovie.year}`}
              title={recommendedMovie.title}
              year={recommendedMovie.year}
            />
          ))
        ) : (
          recommendedMoviesTmdb.map((recommendedMovie) => (
            <RecommendedMovie
              key={recommendedMovie.id}
              title={recommendedMovie.title}
              year={new Date(recommendedMovie.release_date).getFullYear()}
              id={recommendedMovie.id}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default RecommendedMoviesPage;
