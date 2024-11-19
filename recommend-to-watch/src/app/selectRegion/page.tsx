"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProviders } from "../../apiLogic/apiHelpers";
import { getProviderInfo } from "@/redux/reducers/providerReducer";
import { apiCallEnded, apiCallStarted } from "@/redux/reducers/apiReducer";
import CountrySelector from "../../commonComponents/CountrySelector";

// Render region/country selector and handle store logic regarding that and providers
const SelectRegionPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const recMovieData = useAppSelector(
    (state) => state.movies.recommendedMovieData
  );
  const selectedCountry = useAppSelector(
    (state) => state.provider.selectedCountry
  );

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // make request for providers based on rec movie id
    dispatch(apiCallStarted());
    const providers = await getProviders(recMovieData.id, selectedCountry);
    dispatch(apiCallEnded());
    // store provider info in store
    dispatch(getProviderInfo(providers));
    router.push(`/recommendedMovie/${encodeURI(recMovieData.title)}`);
  }

  return (
    <main className="flex gap-8 row-start-2" id="countrySelectContainer">
      <CountrySelector />
      <button
        onClick={handleClick}
        disabled={!selectedCountry}
        id="selectCountryBtn"
      >
        Submit
      </button>
    </main>
  );
};

export default SelectRegionPage;
