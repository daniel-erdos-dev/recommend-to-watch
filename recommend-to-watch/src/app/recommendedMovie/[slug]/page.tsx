"use client";

import BigMovieCard from "@/commonComponents/BigMovieCard";
import Providers from "@/commonComponents/Providers";
import { useAppSelector } from "@/redux/hooks";

const RecommendedMoviePage = () => {
  const getProviderInfo = useAppSelector(
    (state) => state.provider.providerInfo
  );
  const recMovieData = useAppSelector(
    (state) => state.movies.recommendedMovieData
  );
  const movieProps = {
    overview: recMovieData.overview,
    poster_path: recMovieData.poster_path,
    release_date: recMovieData.release_date,
    title: recMovieData.title,
  };

  return (
    <main className="flex gap-8 row-start-2 items-center recMovieContainer">
      <BigMovieCard {...movieProps} />
      <Providers
        flatrate={getProviderInfo?.flatrate}
        buy={getProviderInfo?.buy}
        rent={getProviderInfo?.rent}
      />
    </main>
  );
};

export default RecommendedMoviePage;
