import axios from "axios";
import qs from "qs";

// const ARCHIVE_URL = "https://archive.org/advancedsearch.php";

const YTS_URL = "https://yts.lt/api/v2/list_movies.json";

const searchHelper = async ({ query, page, minRating, year, collections }) => {
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

    return res.data.data;
  } catch (error) {
    return { error };
  }
};

export default searchHelper;
