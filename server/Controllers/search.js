import qs from "qs";

import { searchMoviesOnYts, searchShowsOnPCT } from "../Helpers/search";

const searchMovies = async (req, res) => {
  const parsedQuery = qs.parse(req.query);

  try {
    const data = await searchMoviesOnYts(parsedQuery);
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const searchShows = async (req, res) => {
  const parsedQuery = qs.parse(req.query);

  try {
    const data = await searchShowsOnPCT(parsedQuery);
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export default { searchMovies, searchShows };
