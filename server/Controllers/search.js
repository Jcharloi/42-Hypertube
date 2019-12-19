import qs from "qs";

import searchHelper from "../Helpers/search";

const search = async (req, res) => {
  const parsedQuery = qs.parse(req.query);

  const data = await searchHelper(parsedQuery);
  return res.send(data);
};

export default { search };
