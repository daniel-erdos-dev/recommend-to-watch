"use-client";

import React from "react";
import { useAppDispatch } from "@/redux/hooks";
import { selectCountry } from "@/redux/reducers/providerReducer";

const CountrySelector: React.FC = () => {
  const dispatch = useAppDispatch();

  const countries = [
    { name: "Hungary", code: "HU" },
    { name: "USA", code: "US" },
    { name: "England", code: "GB" },
    { name: "Deutschland", code: "DE" },
    { name: "Austria", code: "AU" },
    { name: "Spain", code: "ES" },
  ];

  function handleSelectorChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    dispatch(selectCountry(event.target.value));
  }

  return (
    <div className="countrySelectorContainer">
      <label htmlFor="countries" className="countrySelectorLabel">
        Select your country:
      </label>
      <select
        name="countries"
        onChange={handleSelectorChange}
        className="countrySelector"
        defaultValue=""
      >
        <option disabled value="">
          {" "}
          -- select an option --{" "}
        </option>
        {countries.map((country) => {
          return (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CountrySelector;
