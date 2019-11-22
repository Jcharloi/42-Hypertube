import qs from "qs";

import getFilmsHelper from "../Helpers/getFilms";

const getFilms = async (req, res) => {
  console.log("over here");
  const parsedQuery = qs.parse(req.query);

  const data = await getFilmsHelper({
    query: parsedQuery.query || null,
    page: parsedQuery.page || 1
  });
  return res.send(data);
};

export default { getFilms };
