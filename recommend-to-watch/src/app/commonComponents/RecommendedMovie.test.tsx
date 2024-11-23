import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RecommendedMovie from "./RecommendedMovie";
import { Provider } from "react-redux";
import { store } from "redux/configureStore";

const DefaultRecommendedMovieProps = {
  id: 0,
  year: 0,
  title: "",
};

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("RecommendedMovie component tests", () => {
  it("renders the title to the component", () => {
    const testTitle = "testTitle";
    render(
      <Provider store={store}>
        <RecommendedMovie {...DefaultRecommendedMovieProps} title={testTitle} />
      </Provider>
    );

    const titleElement = screen.getByRole("heading", { level: 1 });

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(testTitle);
  });

  it("renders the year to the component", () => {
    const currentYear = 1987;
    render(
      <Provider store={store}>
        <RecommendedMovie
          {...DefaultRecommendedMovieProps}
          year={currentYear}
        />
      </Provider>
    );

    const yearElement = screen.getByRole("heading", { level: 3 });

    expect(yearElement).toBeInTheDocument();
    expect(yearElement).toHaveTextContent(currentYear.toString());
  });

  it("renders the where to watch button", () => {
    render(
      <Provider store={store}>
        <RecommendedMovie {...DefaultRecommendedMovieProps} />
      </Provider>
    );

    const whereToButton = screen.getByRole("button");

    expect(whereToButton).toBeInTheDocument();
    expect(whereToButton).toHaveTextContent("Where can I watch?");
  });
});
