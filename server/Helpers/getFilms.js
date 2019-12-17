import axios from "axios";
import qs from "qs";

const ARCHIVE_URL = "https://archive.org/advancedsearch.php";

const getFilmsHelper = async ({
  query,
  page,
  minRating,
  maxRating,
  startYear,
  endYear,
  collections
}) => {
  const formattedDate =
    startYear && endYear
      ? ` date:[${startYear}-01-01 TO ${endYear}-12-31]`
      : "";
  const formattedRating =
    minRating && maxRating ? ` avg_rating:[${minRating} TO ${maxRating}]` : " ";
  const formattedCollections = collections
    ? ` collection:(${collections.join(" OR ")})`
    : "";
  const formattedQuery = query ? ` ${query}` : "";

  const initialQuery = `mediatype:"movies" format:"Archive BitTorrent"${formattedCollections}${formattedDate}${formattedRating}${formattedQuery}`;
  const archiveSearchQuery = {
    q: initialQuery,
    sort: ["downloads desc", "date desc", "titleSorter asc"],
    rows: "10",
    page,
    output: "json"
  };
  const encodedUrl = qs.stringify(archiveSearchQuery).replace(/%20/g, "+");

  const res = await axios.get(`${ARCHIVE_URL}?${encodedUrl}`);
  return res.data.response;
};

export default getFilmsHelper;
