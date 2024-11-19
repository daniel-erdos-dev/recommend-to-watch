import { getRecommendationsFromApi } from "../../../../APIs/chatgtp_api_handler";
import * as tmdbApi from "../../../../APIs/tmdb_handling";

export async function getRecommendations(
  title: string,
  release_date: string
): Promise<any> {
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

      let parsedRecommendations: [{ title: string; year: number }] =
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
