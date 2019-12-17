import qs from "qs";

import getFilmsHelper from "../Helpers/getFilms";

const getFilms = async (req, res) => {
  const parsedQuery = qs.parse(req.query);

  const data = await getFilmsHelper({
    query: parsedQuery.query,
    page: parsedQuery.page,
    startYear: parsedQuery.startYear,
    endYear: parsedQuery.endYear,
    collections: parsedQuery.collections,
    minRating: parsedQuery.minRating,
    maxRating: parsedQuery.maxRating
  });
  return res.send(data);
};

export default { getFilms };
