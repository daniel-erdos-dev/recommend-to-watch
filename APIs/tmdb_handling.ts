import "dotenv/config";

async function provideOptions() {
  const apikey = process.env.NEXT_PUBLIC_TMDB_APIKEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apikey}`,
    },
  };

  return options;
}

export async function getMovieDetailsFromApi(
  title: string,
  year?: number
): Promise<any> {
  const url = year
    ? `https://api.themoviedb.org/3/search/movie?query=${encodeURI(
        title
      )}&primary_release_year=${year}`
    : `https://api.themoviedb.org/3/search/movie?query=${title}`;
  try {
    const options = await provideOptions();
    console.log(options.headers.Authorization);
    const response = await fetch(url, options);
    const data = await response.json();

    return data.results;
  } catch (err) {
    console.error("GET movie details API call failed to TMDB. " + err);
    throw err;
  }
}

// Params: TMDB movie id and 2 digit country code like HU, UK, US
export async function getProviderInfo(
  movie_id: number,
  country_code: string
): Promise<any> {
  try {
    const options = await provideOptions();

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers`,
      options
    );
    const data = await response.json();

    const results = data.results[country_code];

    return results;
  } catch (err) {
    console.error("API call failed to TMDB. " + err);
    throw err;
  }
}
