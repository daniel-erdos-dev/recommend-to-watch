import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "redux/configureStore";
import SelectRegionPage from "./page";
import { expect } from "jest-without-globals";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("selectRegion page tests", () => {
  it("renders the submit button to the component", () => {
    render(
      <Provider store={store}>
        <SelectRegionPage />
      </Provider>
    );

    const submitButton = screen.getByRole("button");

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("Submit");
  });

  // Rest of the elements are tested in the CountrySelector.test.tsx file
});
