import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CountrySelector from "./CountrySelector";
import { countries } from "./CountrySelector";
import { Provider } from "react-redux";
import { store } from "../../redux/configureStore";

beforeEach(() => {
  render(
    <Provider store={store}>
      <CountrySelector />
    </Provider>
  );
});

describe("CountrySelector component tests", () => {
  it("renders the label to the selector", () => {
    const labelElement = screen.getByText("Select your country:");

    expect(labelElement).toBeInTheDocument();
  });

  it("renders the select to the selector", () => {
    const selectElement = screen.getByTestId("country-selector");

    expect(selectElement).toBeInTheDocument();
  });

  it("renders the options to the selector", () => {
    const options = screen.getAllByRole("option");

    expect(options.length).toEqual(countries.length + 1);
    countries.forEach((country) => {
      const optionElement = screen.queryByText(
        country.name
      ) as HTMLOptionElement;
      expect(optionElement).toBeInTheDocument();
      expect(optionElement.value).toEqual(country.code);
    });
  });

  it("should correctly set the default option", () => {
    const defaultOption = screen.getByRole("option", {
      name: "-- select an option --",
    }) as HTMLOptionElement;

    expect(defaultOption.selected).toBe(true);
  });
});
