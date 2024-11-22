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
    <div className="flex flex-col gap-4 items-center">
      <label htmlFor="countries" className="text-lg font-bold">
        Select your country:
      </label>
      <select
        name="countries"
        onChange={handleSelectorChange}
        className="px-20 py-2 text-center font-medium border-b-2 border-gray-300 focus:outline-none"
      >
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
