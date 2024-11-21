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
      <div className="grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-16 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <h1>
            Search for your favorite movie and get movie recommendations based
            on it!
          </h1>
          <Link href={"/about"} id="aboutLink">
            About
          </Link>
          <input type="text" className="movieInput" onChange={handleChange} />
          <button
            className="recommendButton"
            onClick={handleClick}
            disabled={searchMovieTitle == ""}
          >
            Recommend
          </button>
        </main>
      </div>
    </Provider>
  );
}
