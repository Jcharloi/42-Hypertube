import qs from "qs";

import searchHelper from "../Helpers/search";

const searchMovies = async (req, res) => {
  const parsedQuery = qs.parse(req.query);

  const data = await searchHelper.searchMovies(parsedQuery);
  if (data.error) {
    return res.status(404).send(data);
  }
  return res.status(200).send(data);
};

const searchShows = async (req, res) => {
  const parsedQuery = qs.parse(req.query);

  const data = await searchHelper.searchShows(parsedQuery);

  if (data.error) {
    return res.status(404).send(data);
  }
  return res.status(200).send(data);
};

export default { searchMovies, searchShows };
