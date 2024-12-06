import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "redux/configureStore";
import Home from "./page";
import { expect } from "jest-without-globals";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Home page tests", () => {
  it("renders the header to the page", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const headingElement = screen.getByRole("heading", { level: 1 });

    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(
      "Search for your favorite movie and get movie recommendations based on it!"
    );
  });

  it("renders the input to the page", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const searchBox = screen.getByRole("textbox");

    expect(searchBox).toBeInTheDocument();
  });

  it("renders the recommend button to the page", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const recommendButton = screen.getByRole("button");

    expect(recommendButton).toBeInTheDocument();
    expect(recommendButton).toHaveTextContent("Recommend");
  });
});
