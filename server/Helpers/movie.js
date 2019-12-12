import MovieCommentModel from "../Schemas/Movie";

const sortReviews = (reviews, ourReviews) => {
  reviews.splice(reviews.length - 1, 0, ...ourReviews);
  reviews.sort((reviewA, reviewB) => reviewA.month - reviewB.month);

  return reviews;
};

const findReviews = async movieId => {
  try {
    const reviews = await MovieCommentModel.find({ movieId });
    let ourReviews = [];
    if (reviews.length > 0) {
      reviews.map(({ name, month, day, year, stars, body }) => {
        ourReviews.push({ name, month, day, year, stars, body });
      });
    }
    return ourReviews;
  } catch (e) {
    console.error(e.message);
    return e.message;
  }
};

const saveReview = async comment => {
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

export default { saveReview, sortReviews, findReviews };
