import homeHelper from "../Helpers/home";

const feed = async (req, res) => {
  const data = await homeHelper.feed();

  return res.status(200).send(data);
};

const recents = async (req, res) => {
  const data = await homeHelper.recents();

  return res.status(200).send(data);
};

export default { feed, recents };
