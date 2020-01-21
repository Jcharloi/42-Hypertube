import MovieCommentModel from "../Schemas/Movie";

const feed = async () => {
  try {
    const reviews = await MovieCommentModel.find({}).sort({ date: -1 });

    return reviews;
  } catch (e) {
    return { e };
  }
};

const recents = async ({ userId = "" }) => {
  try {
    console.log(userId);
    // const history = await
    return [];
  } catch (e) {
    return { e };
  }
};

export default { feed, recents };
