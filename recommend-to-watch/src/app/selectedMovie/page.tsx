"use client";

import SingleMovie from "../../commonComponents/SingleMovie";
import Spinner from "../../commonComponents/Spinner";
import { useAppSelector } from "@/redux/hooks";

const SelectedMoviePage = () => {
  const selectedMovie = useAppSelector((state) => state.movies.selectedMovie);
  const apiCallInProgress = useAppSelector(
    (state) => state.api.apiCallsInProgress
  );

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center ">
      {apiCallInProgress ? (
        <Spinner />
      ) : (
        <SingleMovie
          overview={selectedMovie?.overview ? selectedMovie.overview : ""}
          poster_path={selectedMovie.poster_path}
          release_date={selectedMovie.release_date}
          title={selectedMovie.title}
          id={selectedMovie.id}
        />
      )}
    </main>
  );
};

export default SelectedMoviePage;
