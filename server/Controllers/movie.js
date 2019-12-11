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

const receiveComment = (req, res) => {
  Axios.get(`https://archive.org/metadata/${req.body.movieId}`)
    .then(async ({ data }) => {
      if (
        data.metadata &&
        checkDate(req.body.year, req.body.month, req.body.day) &&
        req.body.body &&
        req.body.body.length < 1001
      ) {
        const ret = await movieHelpers.saveComment({
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

export default { receiveComment };
