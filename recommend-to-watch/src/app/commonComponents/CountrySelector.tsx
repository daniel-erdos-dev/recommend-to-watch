"use-client";

import React from "react";
import { useAppDispatch } from "../../redux/hooks";
import { selectCountry } from "../../redux/reducers/providerReducer";

export const countries = [
  { name: "Hungary", code: "HU" },
  { name: "USA", code: "US" },
  { name: "England", code: "GB" },
  { name: "Deutschland", code: "DE" },
  { name: "Austria", code: "AU" },
  { name: "Spain", code: "ES" },
];

const CountrySelector: React.FC = () => {
  const dispatch = useAppDispatch();

  function handleSelectorChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    dispatch(selectCountry(event.target.value));
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <label htmlFor="countries" className="text-lg font-bold">
        Select your country:
      </label>
      <select
        name="countries"
        data-testid="country-selector"
        aria-labelledby="countrySelectorLabel"
        onChange={handleSelectorChange}
        defaultValue=""
        required
      >
        <option disabled value="" className="text-slate-600" hidden>
          {" "}
          select an option{" "}
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
