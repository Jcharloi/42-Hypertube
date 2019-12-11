import MovieCommentModel from "../Schemas/Movie";

const saveComment = async comment => {
  try {
    await MovieCommentModel.create({
      _id: comment.id,
      movieId: comment.movieId,
      name: comment.name,
      month: comment.month,
      day: comment.day,
      year: comment.year,
      stars: comment.stars,
      body: comment.body
    });
    return true;
  } catch (e) {
    console.error(e.message);
    return e.message;
  }
};

export default { saveComment };
