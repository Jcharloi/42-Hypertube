import axios from "axios";
import qs from "qs";

const ARCHIVE_URL = "https://archive.org/advancedsearch.php";

const getFilmsHelper = async ({ query, page }) => {
  const initialQuery = `mediatype:"movies" format:"Archive BitTorrent"${
    query ? ` ${query}` : ""
  }`;
  const archiveSearchQuery = {
    [initialQuery]: "",
    sort: ["downloads desc", "date desc", "titleSorter asc"],
    rows: "50",
    page,
    output: "json"
  };

  console.log("end result", qs.stringify(archiveSearchQuery));

  const res = await axios.get(
    `${ARCHIVE_URL}?q=${qs.stringify(archiveSearchQuery)}`
  );

  return res.data.response;
};

export default getFilmsHelper;
