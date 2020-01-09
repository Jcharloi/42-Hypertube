import Axios from "axios";
import fs from "fs";

import movieHelpers from "../Helpers/movie";
import mongoose from "../mongo";
import ioConnection from "..";

const getInfos = (req, res) => {
  const movieId = req.params.id;
  Axios.get(`https://archive.org/metadata/${movieId}`)
    .then(async ({ data }) => {
      if (Object.values(data).length > 0) {
        let totalStars = 0;
        let reviews = [];
        let reviewsLength = 0;
        if (data.reviews) {
          data.reviews.forEach((review) => {
            totalStars += parseInt(review.stars, 10);
            if (review.stars > 0) reviewsLength += 1;
            reviews.push({
              id: Date.parse(review.createdate),
              name: review.reviewer,
              date: Date.parse(review.reviewdate),
              stars: parseInt(review.stars, 10),
              body: review.reviewbody
            });
          });
        }
        const videoObject = data.files.find(
          ({ name }) =>
            name.split(".")[name.split(".").length - 1] === "mp4" ||
            name.split(".")[name.split(".").length - 1] === "webm"
        );
        const extension = videoObject.name.split(".")[
          videoObject.name.split(".").length - 1
        ];
        const infos = {
          title: data.metadata.title,
          description: data.metadata.description,
          creator: data.metadata.creator,
          prodDate: data.metadata.date,
          runTime: data.metadata.ia_orig__runtime,
          stars:
            data.reviews && data.reviews.length > 0
              ? Math.floor(totalStars / reviewsLength)
              : null,
          extension
        };
        const dest = `./server/data/movie/${movieId}.${extension}`;
        if (!fs.existsSync(dest)) {
          fs.createWriteStream(dest);
        }
        const ourReviews = await movieHelpers.findReviews(req.params.id);
        if (typeof ourReviews !== "string") {
          reviews = movieHelpers.sortReviews(reviews, ourReviews);
          res.status(200).send({ infos, reviews });
        } else {
          res.sendStatus(500);
        }
      } else {
        res.sendStatus(500);
      }
    })
    .catch((e) => {
      console.error(e.message);
      res.sendStatus(500);
    });
};

const downloadVideo = (req, res) => {
  const movieId = req.params.id;
  Axios.get(`https://archive.org/metadata/${movieId}`)
    .then(({ data }) => {
      if (Object.values(data).length > 0) {
        const videoObject = data.files.find(
          ({ name }) =>
            name.split(".")[name.split(".").length - 1] === "mp4" ||
            name.split(".")[name.split(".").length - 1] === "webm"
        );
        const source = videoObject.name;
        // const sourceSize = parseInt(videoObject.size, 10);
        const extension = videoObject.name.split(".")[
          videoObject.name.split(".").length - 1
        ];
        const dest = `./server/data/movie/${movieId}.${extension}`;
        const stats = fs.statSync(dest);
        // console.log(
        //   "Original file size: ",
        //   sourceSize,
        //   "Downloaded file size : ",
        //   stats.size,
        //   "extension : ",
        //   extension
        // );
        if (stats.size === 0) {
          const url = `http://archive.org${data.dir}/${source}`;
          movieHelpers.createMovieFile(url, dest, (err) => {
            if (err) {
              console.error(err);
              res.sendStatus(500);
            } else {
              res.sendStatus(200);
            }
          });
        } else {
          res.sendStatus(200);
        }
      } else {
        res.sendStatus(500);
      }
    })
    .catch((e) => {
      console.error(e.message);
      res.sendStatus(500);
    });
};

const receiveReviews = (req, res) => {
  Axios.get(`https://archive.org/metadata/${req.body.movieId}`)
    .then(async ({ data }) => {
      if (data.metadata && req.body.body && req.body.body.length < 1001) {
        const ret = await movieHelpers.saveReview({
          _id: new mongoose.Types.ObjectId(),
          movieId: req.body.movieId,
          name: req.body.name,
          date: req.body.date,
          stars: req.body.stars,
          body: req.body.body
        });
        if (typeof ret !== "string") {
          const fullDate = String(new Date(req.body.date)).split(" ");
          ioConnection.ioConnection.to(req.body.movieId).emit("New comments", {
            id: Date.now(),
            name: req.body.name,
            date: movieHelpers.timestampToDate(
              fullDate[1],
              fullDate[2],
              fullDate[3]
            ),
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
    .catch((e) => {
      console.error(e.message);
      res.sendStatus(500);
    });
};

export default { getInfos, downloadVideo, receiveReviews };
