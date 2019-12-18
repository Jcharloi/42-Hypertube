import MovieCommentModel from "../Schemas/Movie";

const timestampToDate = (month, day, year) => {
  return month + ", " + day + ", " + year;
};

const sortReviews = (reviews, ourReviews) => {
  let copyReviews = reviews;
  reviews.splice(reviews.length - 1, 0, ...ourReviews);
  reviews.sort((reviewA, reviewB) => reviewA.date - reviewB.date);
  reviews.map(({ date }, index) => {
    const fullDate = String(new Date(date)).split(" ");
    copyReviews[index].date = timestampToDate(
      fullDate[1],
      fullDate[2],
      fullDate[3]
    );
    return 1;
  });
  return reviews;
};

const findReviews = async (movieId) => {
  try {
    const reviews = await MovieCommentModel.find({ movieId });
    const ourReviews = [];
    if (reviews.length > 0) {
      reviews.map(({ _id, name, date, stars, body }) => {
        ourReviews.push({ id: _id, name, date, stars, body });
        return 1;
      });
    }
    return ourReviews;
  } catch (e) {
    console.error(e.message);
    return e.message;
  }
};

const saveReview = async (comment) => {
  try {
    await MovieCommentModel.create({
      _id: comment.id,
      movieId: comment.movieId,
      name: comment.name,
      date: comment.date,
      stars: comment.stars,
      body: comment.body
    });
    return true;
  } catch (e) {
    console.error(e.message);
    return e.message;
  }
};

export default { timestampToDate, saveReview, sortReviews, findReviews };
