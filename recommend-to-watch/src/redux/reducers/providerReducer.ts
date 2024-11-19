import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../configureStore";

interface ProviderState {
  selectedCountry: string;
  selectedMovie: {
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
  };
  providerInfo: {
    tmdb_link: string;
    flatrate: [
      {
        logo_path: string;
        provider_name: string;
      }
    ];
    buy: [
      {
        logo_path: string;
        provider_name: string;
      }
    ];
    rent: [
      {
        logo_path: string;
        provider_name: string;
      }
    ];
  };
}

const emptyMovie = {
  id: 0,
  overview: "",
  poster_path: "",
  release_date: "",
  title: "",
};

const initialState: ProviderState = {
  selectedMovie: emptyMovie,
  selectedCountry: "",
  providerInfo: {
    tmdb_link: "",
    flatrate: [
      {
        logo_path: "",
        provider_name: "",
      },
    ],
    buy: [
      {
        logo_path: "",
        provider_name: "",
      },
    ],
    rent: [
      {
        logo_path: "",
        provider_name: "",
      },
    ],
  },
};

export const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    selectMovie: (
      state,
      action: PayloadAction<{
        id: number;
        overview: string;
        poster_path: string;
        release_date: string;
        title: string;
      }>
    ) => {
      state.selectedMovie = action.payload;
    },
    selectCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload;
    },
    getProviderInfo: (
      state,
      action: PayloadAction<{
        tmdb_link: string;
        flatrate: [
          {
            logo_path: string;
            provider_name: string;
          }
        ];
        buy: [
          {
            logo_path: string;
            provider_name: string;
          }
        ];
        rent: [
          {
            logo_path: string;
            provider_name: string;
          }
        ];
      }>
    ) => {
      state.providerInfo = action.payload;
    },
  },
});

export const { selectMovie, selectCountry, getProviderInfo } =
  providerSlice.actions;

export const selectSelectedMovie = (state: RootState) =>
  state.provider.selectedMovie;
export const selectSelectedCountry = (state: RootState) =>
  state.provider.selectedCountry;

export const selectProviderInfo = (state: RootState) =>
  state.provider.providerInfo;

export default providerSlice.reducer;
