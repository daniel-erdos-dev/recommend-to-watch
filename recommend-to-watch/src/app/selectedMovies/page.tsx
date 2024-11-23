"use client";

import MultipleMovies from "../commonComponents/MultipleMovies";
import Spinner from "../commonComponents/Spinner";
import { useAppSelector } from "@/redux/hooks";

const SelectedMoviesPage = () => {
  const movieList = useAppSelector((state) => state.movies.movieList);
  const apiCallInProgress = useAppSelector(
    (state) => state.api.apiCallsInProgress
  );

  return (
    <main className="flex gap-8">
      {apiCallInProgress ? <Spinner /> : <MultipleMovies movies={movieList} />}
    </main>
  );
};

export default SelectedMoviesPage;
