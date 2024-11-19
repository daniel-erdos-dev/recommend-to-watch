"use client";

import RecommendedMovie from "@/commonComponents/RecommendedMovie";
import Spinner from "@/commonComponents/Spinner";
import { useAppSelector } from "@/redux/hooks";

// Show the movies recommended by ChatGPT
const RecommendedPage = () => {
  const recommendedMovies = useAppSelector(
    (state) => state.movies.recommendedMovies
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
        ) : (
          recommendedMovies.map((recommendedMovie) => (
            <RecommendedMovie
              key={`${recommendedMovie.title},${recommendedMovie.year}`}
              title={recommendedMovie.title}
              year={recommendedMovie.year}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default RecommendedPage;
