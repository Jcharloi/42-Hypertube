import qs from "qs";

import searchHelper from "../Helpers/search";

const search = async (req, res) => {
  const parsedQuery = qs.parse(req.query);

  const data = await searchHelper({
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

export default { search };
