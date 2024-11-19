import { getRecommendationsFromApi } from "../../../APIs/chatgtp_api_handler";
import * as tmdbApi from "../../../APIs/tmdb_handling";

export async function getRecommendations(
  title: string,
  release_date: string,
  id: number
  /* eslint-disable @typescript-eslint/no-explicit-any */
): Promise<any> {
  // directly calling chatGPT API from the client would expose the api key, so recommendations
  // by chatGPT only works locally with the api key set in an env file
  // if the application runs in a browser, it'll change to get recommendations from TMDB

  if (document.location.hostname === "localhost") {
    return await getRecommendationsFromChatGPT(title, release_date);
  } else {
    return await getRecommendationsFromTMDB(id);
  }
}

async function getRecommendationsFromTMDB(id: number) {
  try {
    const movie = await tmdbApi.getSimilarMovies(id);

    return movie;
  } catch (err) {
    console.error(
      "Something went wrong when called tmdb api to get movie info: " + err
    );
  }
}

async function getRecommendationsFromChatGPT(
  title: string,
  release_date: string
) {
  try {
    const recommendations = await getRecommendationsFromApi(
      title,
      new Date(release_date).getFullYear().toString()
    );

    if (recommendations) {
      const validJsonPart = recommendations.substring(
        recommendations.indexOf("["),
        recommendations.indexOf("]") + 1
      );

      const parsedRecommendations: [{ title: string; year: number }] =
        JSON.parse(validJsonPart);

      return parsedRecommendations;
    }
  } catch (err) {
    console.error(
      "Something went wrong when called cgpt api and parsed the data: " + err
    );
  }
}

export async function getProviders(
  movie_id: number,
  country_code: string
  /* eslint-disable @typescript-eslint/no-explicit-any */
): Promise<any> {
  try {
    const providers = await tmdbApi.getProviderInfo(movie_id, country_code);

    return providers;
  } catch (err) {
    console.error(
      "Something went wrong when called tmdb api to get provider info: " + err
    );
  }
}

export async function getMovieDetails(
  title: string,
  year?: number
  /* eslint-disable @typescript-eslint/no-explicit-any */
): Promise<any> {
  try {
    const movie = await tmdbApi.getMovieDetailsFromApi(title, year);

    return movie;
  } catch (err) {
    console.error(
      "Something went wrong when called tmdb api to get movie info: " + err
    );
  }
}
