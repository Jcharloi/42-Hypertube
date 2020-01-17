import axios from "axios";
import qs from "qs";

// const ARCHIVE_URL = "https://archive.org/advancedsearch.php";

const YTS_URL = "https://yts.lt/api/v2/list_movies.json";
const POPCORN_URL = "https://tv-v2.api-fetch.website/shows";

const searchMovies = async ({ query, page, minRating, year, collections }) => {
  try {
    const queryParams = qs.stringify({
      limit: 12,
      sort_by: "download_count",
      minimum_rating: minRating * 2 || 0,
      page,
      query_term: `${query || ""} ${year || ""}`,
      genre: collections
    });

    const res = await axios.get(`${YTS_URL}?${queryParams}`);

    const parsedMovies =
      (res.data &&
        res.data.data.movies.map((movie) => ({
          cover: movie.large_cover_image,
          title: movie.title_english,
          year: movie.year,
          summary: movie.summary,
          genres: movie.genres,
          rating: movie.rating / 2,
          id: movie.id,
          runtime: movie.runtime,
          seasons: null
        }))) ||
      [];

    return {
      nextPage: parsedMovies.length === 12,
      medias: parsedMovies
    };
  } catch (error) {
    return { error };
  }
};
const searchShows = async ({ query, page, collections }) => {
  try {
    const queryParams = qs.stringify({
      genre: collections,
      keywords: query,
      sort: "trending"
    });
    const res = await axios.get(`${POPCORN_URL}/${page}?${queryParams}`);

    const parsedShows =
      (res.data &&
        res.data.map((show) => ({
          cover: show.images.poster,
          title: show.title,
          year: show.year,
          summary: null,
          genres: null,
          rating: show.rating.percentage / 20,
          id: show.imdb_id,
          runtime: null,
          seaons: show.num_seasons
        }))) ||
      [];

    return {
      nextPage: parsedShows.length === 50,
      medias: parsedShows
    };
  } catch (error) {
    return { error };
  }
};

export default { searchMovies, searchShows };
