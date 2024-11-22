"use client";

import Movie from "@/app/commonComponents/Movie";
import Providers from "../../commonComponents/Providers";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <main className="flex gap-8 items-center justify-center mt-10 items-start">
      <div className="flex flex-col justify-between p-5 bg-white rounded-lg shadow-lg self-start">
        <Movie {...movieProps} />
      </div>
      <div className="flex flex-col justify-between p-5 bg-white rounded-lg shadow-lg self-start">
        <Providers
          flatrate={getProviderInfo?.flatrate}
          buy={getProviderInfo?.buy}
          rent={getProviderInfo?.rent}
        />
      </div>
      <button onClick={() => router.push("/recommendedMovies")}>
        Back to recommended list
      </button>
    </main>
  );
};

export default RecommendedMoviePage;
