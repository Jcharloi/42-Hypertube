import Axios from "axios";

import movieHelpers from "../Helpers/movie";
import mongoose from "../mongo";
import { ioConnection } from "..";

const checkDate = (yearComment, monthComment, dayComment) => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = String(today.getFullYear());
  return year === yearComment && month === monthComment && day === dayComment;
};

const getInfos = (req, res) => {
  Axios.get(`https://archive.org/metadata/${req.params.id}`)
    .then(async ({ data }) => {
      let totalStars = 0;
      let reviews = [];
      if (data.reviews) {
        data.reviews.map(review => {
          totalStars += parseInt(review.stars, 10);
          reviews.push({
            name: review.reviewer,
            month: review.reviewdate.split("-")[1],
            day: review.reviewdate.split("-")[2].split(" ")[0],
            year: review.reviewdate.split("-")[0],
            stars: parseInt(review.stars),
            body: review.reviewbody
          });
        });
      }
      const infos = {
        title: data.metadata.title,
        description: data.metadata.description,
        creator: data.metadata.creator,
        prodDate: data.metadata.date,
        runTime: data.metadata.runtime,
        stars:
          data.reviews && data.reviews.length > 0
            ? Math.floor(totalStars / data.reviews.length)
            : null
      };
      const ourReviews = await movieHelpers.findReviews(req.params.id);
      //verif ourReviews
      reviews = movieHelpers.sortReviews(reviews, ourReviews);
      console.log(infos, reviews);
      res.status(200).send({ infos, reviews });
    })
    .catch(e => {
      console.error(e.message);
      res.sendStatus(500);
    });
};

const receiveReviews = (req, res) => {
  Axios.get(`https://archive.org/metadata/${req.body.movieId}`)
    .then(async ({ data }) => {
      if (
        data.metadata &&
        checkDate(req.body.year, req.body.month, req.body.day) &&
        req.body.body &&
        req.body.body.length < 1001
      ) {
        const ret = await movieHelpers.saveReview({
          id: new mongoose.Types.ObjectId(),
          movieId: req.body.movieId,
          name: req.body.name,
          month: req.body.month,
          day: req.body.day,
          year: req.body.year,
          stars: req.body.stars,
          body: req.body.body
        });
        if (ret === true) {
          ioConnection.to(req.body.movieId).emit("New comments", {
            name: req.body.name,
            month: req.body.month,
            day: req.body.day,
            year: req.body.year,
            stars: req.body.stars,
            body: req.body.body
          });
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      } else {
        res.sendStatus(409);
      }
    })
    .catch(e => {
      console.error(e.message);
      res.sendStatus(500);
    });
};

export default { receiveReviews, getInfos };
