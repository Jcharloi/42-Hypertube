import Axios from "axios";
import MovieCommentModel from "../Schemas/Movie";

const getRecommendation = async (req, res) => {
  const list = [];
  await Axios(`https://tv-v2.api-fetch.website/movies/1`).then((response) => {
    for (let index = 0; index < 4; index++) {
      const id = Math.round(Math.random() * 49);
      if (
        index === 0 ||
        list.filter((movie) => movie.imdbId === response.data[id].imdb_id)
          .length === 0
      ) {
        list.push({
          title: response.data[id].title,
          img: response.data[id].images.poster,
          imdbId: response.data[id].imdb_id,
          genre: response.data[id].genres[0]
        });
      } else {
        index--;
      }
    }
  });
  return res.send({ list });
};

const timestampToDate = (month, day, year) => {
  return `${month}, ${day}, ${year}`;
};

const sortReviews = (reviews, ourReviews) => {
  const copyReviews = reviews;
  copyReviews.push(...ourReviews);
  if (copyReviews.length > 1) {
    copyReviews.sort((reviewA, reviewB) => reviewA.date - reviewB.date);
  }
  copyReviews.forEach(({ date }, index) => {
    const fullDate = String(new Date(date)).split(" ");
    copyReviews[index].date = timestampToDate(
      fullDate[1],
      fullDate[2],
      fullDate[3]
    );
  });
  return copyReviews;
};

const findReviews = async (movieId) => {
  try {
    const reviews = await MovieCommentModel.find({ movieId });
    const ourReviews = [];
    if (reviews.length > 0) {
      reviews.forEach(({ _id, name, date, stars, body }) => {
        ourReviews.push({ id: _id, name, date, stars, body });
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
      _id: comment._id,
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

export default {
  timestampToDate,
  saveReview,
  sortReviews,
  findReviews,
  getRecommendation
};
