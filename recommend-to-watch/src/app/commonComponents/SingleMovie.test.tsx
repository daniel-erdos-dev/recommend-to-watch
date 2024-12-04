import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "redux/configureStore";
import SingleMovie from "./SingleMovie";

const DefaultSingleMovieProps = {
  id: 0,
  title: "",
  overview: "",
  poster_path: "",
  release_date: "",
};

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("SingleMovie component tests", () => {
  it("render the question about wanted movie", () => {
    render(
      <Provider store={store}>
        <SingleMovie {...DefaultSingleMovieProps} />
      </Provider>
    );

    const questionElement = screen.getByText(
      "Is this the movie you thought about?"
    );

    expect(questionElement).toBeInTheDocument();
    expect(questionElement).toHaveRole("heading");
  });

  it("renders both buttons", () => {
    render(
      <Provider store={store}>
        <SingleMovie {...DefaultSingleMovieProps} />
      </Provider>
    );

    const bothButton = screen.getAllByRole("button");
    const yesButton = screen.getByText("Yes");
    const noButton = screen.getByText("No");

    expect(bothButton.length).toEqual(2);
    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();
    expect(yesButton).toHaveRole("button");
    expect(noButton).toHaveRole("button");
  });

  // Rest of the elements are tested already in the Movie.test.tsx test file
});
