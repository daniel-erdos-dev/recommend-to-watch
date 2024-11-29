const TMDB_BASE_URL =
  "https://7jgljub8ej.execute-api.eu-north-1.amazonaws.com/tmdb";

const CGPT_BASE_URL =
  "https://yvrjb4945a.execute-api.eu-north-1.amazonaws.com/cgpt";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-api-key": "ydVxp86hGj30dH8QC9Do13xlxdWrm39J5fYeVUkB",
  },
};

export async function getRecommendationsFromTMDB(id: number) {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/similar?id=${id}`, options);
    const data = await response.json();

    return data.results;
  } catch (err) {
    console.error("GET movie details API call failed to TMDB. " + err);
    throw err;
  }
}

export async function getRecommendationsFromChatGPT(
  title: string,
  release_date: string
) {
  try {
    const response = await fetch(
      `${CGPT_BASE_URL}/recommend?title=${title}&year=${new Date(release_date)
        .getFullYear()
        .toString()}`,
      options
    );

    const recommendations = await response.json();

    const body = recommendations.body;

    if (body) {
      const validJsonPart = body.substring(
        body.indexOf("["),
        body.indexOf("]") + 1
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
    const response = await fetch(
      `${TMDB_BASE_URL}/providers?movie_id=${movie_id}&country_code=${country_code}`,
      options
    );
    const apiResults = await response.json();

    const results = apiResults.body[country_code];

    return results;
  } catch (err) {
    console.error("API call failed to TMDB. " + err);
    throw err;
  }
}

export async function getMovieDetails(
  title: string,
  year?: number
  /* eslint-disable @typescript-eslint/no-explicit-any */
): Promise<any> {
  const url = year
    ? `${TMDB_BASE_URL}/movie/titleandyear?title=${encodeURI(
        title
      )}&year=${year}`
    : `${TMDB_BASE_URL}/movie/title?title=${encodeURI(title)}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const json = JSON.parse(data.body);

    return json;
  } catch (err) {
    console.error("GET movie details API call failed to TMDB. " + err);
    throw err;
  }
}
