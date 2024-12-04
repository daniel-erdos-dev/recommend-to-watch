"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  loadMovies,
  selectMovie,
  setSearchMovieTitle,
} from "../redux/reducers/movieReducer";
import { Provider } from "react-redux";
import { store } from "../redux/configureStore";
import { getMovieDetails } from "../apiLogic/apiHelpers";
import { apiCallEnded, apiCallStarted } from "../redux/reducers/apiReducer";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchMovieTitle = useAppSelector(
    (state) => state.movies.searchMovieTitle
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const title: string = event.target.value;
    dispatch(setSearchMovieTitle(title));
  }

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let route: string;
    try {
      dispatch(apiCallStarted());
      const movieList = await getMovieDetails(searchMovieTitle);

      if (movieList.length > 1) {
        route = "/selectedMovies";
        dispatch(loadMovies(movieList));
      } else {
        route = "/selectedMovie";
        dispatch(selectMovie(movieList[0]));
      }
      dispatch(apiCallEnded());
      router.push(route);
    } catch (err) {
      console.error(
        "Unable to get movie list based on query from the api... " + err
      );
    }
  }

  return (
    <Provider store={store}>
      <div className="items-center justify-items-center min-h-min font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 items-center bg-white p-8 mt-8 rounded-lg shadow-lg mx-auto max-w-4xl">
          <h1>
            Search for your favorite movie and get movie recommendations based
            on it!
          </h1>

          <input type="text" onChange={handleChange} />
          <button onClick={handleClick} disabled={searchMovieTitle == ""}>
            Recommend
          </button>
        </main>
      </div>
    </Provider>
  );
}
