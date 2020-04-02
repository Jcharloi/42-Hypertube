import axios from "axios";
import qs from "qs";

const YTS_BASE_URL = "https://yts.ae";
const YTS_URL = `${YTS_BASE_URL}/api/v2/list_movies.json`;
// const POPCORN_URL = "https://tv-v2.api-fetch.website/shows";

export const searchMoviesOnYts = async ({
  query,
  page,
  minRating,
  year,
  collections
}) => {
  const queryParams = qs.stringify({
    limit: 12,
    sort_by: "download_count",
    minimum_rating: minRating * 2 || 0,
    page,
    query_term: `${query || ""} ${year || ""}`,
    genre: collections
  });

  const { data } = await axios.get(`${YTS_URL}?${queryParams}`);

  if (data && data.data.movie_count === 0) {
    return {
      nextPage: false,
      medias: []
    };
  }

  const parsedMovies =
    (data &&
      data.data.movies.map((movie) => ({
        cover: YTS_BASE_URL + movie.large_cover_image,
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
};

// Todo: adapt to film

// export const searchShowsOnPCT = async ({ query, page, collections }) => {
//   const queryParams = qs.stringify({
//     genre: collections,
//     keywords: query,
//     sort: "trending"
//   });
//   const { data } = await axios.get(`${POPCORN_URL}/${page}?${queryParams}`);

//   const parsedShows =
//     (data &&
//       data.map((show) => ({
//         cover: show.images.poster,
//         title: show.title,
//         year: show.year,
//         summary: null,
//         genres: null,
//         rating: show.rating.percentage / 20,
//         id: show.imdb_id,
//         runtime: null,
//         seaons: show.num_seasons
//       }))) ||
//     [];

//   return {
//     nextPage: parsedShows.length === 50,
//     medias: parsedShows
//   };
// };

export default { searchMoviesOnYts };
