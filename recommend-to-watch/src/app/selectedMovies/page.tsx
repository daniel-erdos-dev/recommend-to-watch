"use client";

import MultipleMovies from "@/commonComponents/MultipleMovies";
import Spinner from "@/commonComponents/Spinner";
import { useAppSelector } from "@/redux/hooks";

const SelectedMoviesPage = () => {
  const movieList = useAppSelector((state) => state.movies.movieList);
  const apiCallInProgress = useAppSelector(
    (state) => state.api.apiCallsInProgress
  );

  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start ">
        {apiCallInProgress ? (
          <Spinner />
        ) : (
          <MultipleMovies movies={movieList} />
        )}
      </main>
    </div>
  );
};

export default SelectedMoviesPage;
