// Issues with mocking OpenAI api fetch call mock

/*

import "openai/shims/web";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Movie from "./Movie";
import MultipleMovies from "./MultipleMovies";
import { Provider } from "react-redux";
import { store } from "redux/configureStore";
import fetchMock from "jest-fetch-mock";

jest.mock("./Movie", () => () => {
  return <Movie overview={""} poster_path={""} release_date={""} title={""} />;
});

jest.mock("next/navigation", () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => {},
    }),
  };
});

fetchMock.enableMocks();

const defaultMovies = [
  {
    overview: "test",
    poster_path: "test1.png",
    release_date: "1999_11_11",
    title: "test1",
    id: 1,
  },
  {
    overview: "testtest",
    poster_path: "test2.png",
    release_date: "2000_12_12",
    title: "test2",
    id: 2,
  },
];

beforeEach(() => {
  fetchMock.mockResponseOnce(JSON.stringify(defaultMovies));
  render(
    <Provider store={store}>
      <MultipleMovies movies={defaultMovies} />
    </Provider>
  );
});
*/

describe("MultipleMovies component tests", () => {
  it("is just a placeholder test", () => {});
  /*
  it("renders as many Movie components as many item in movies array", () => {
    const movieComponents = screen.getAllByTestId(
      "multiple-movies-movie-component"
    );

    expect(movieComponents.length).toEqual(2);
  });

  it("renders choose button for every rendered movie component", () => {
    const chooseMovieButtons = screen.getAllByText("Choose this Movie");

    expect(chooseMovieButtons).toBe(HTMLButtonElement);
    expect(chooseMovieButtons.length).toEqual(2);
  });
  */
});
