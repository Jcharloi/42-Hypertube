import Axios from "axios";

import movieHelpers from "../Helpers/movie";
import mongoose from "../mongo";
import ioConnection from "..";

const getInfos = (req, res) => {
  const movieId = req.params.id;
  Axios.get(`https://yts.tl/api/v2/movie_details.json?movie_id=${movieId}`)
    .then(
      async ({
        data: {
          data: { movie }
        }
      }) => {
        const infos = {
          title: movie.title,
          description: movie.description_full,
          prodDate: movie.year,
          runTime: movie.runtime,
          imdbRating: movie.rating / 2,
          poster: movie.medium_cover_image
        };
        const reviews = await movieHelpers.findReviews(movieId);
        if (typeof reviews !== "string") {
          res.status(200).send({
            infos,
            reviews
          });
        } else {
          res.sendStatus(500);
        }
      }
    )
    .catch((e) => {
      console.error(e.message);
      res.sendStatus(500);
    });
};

const startDlVideo = (req, res) => {
  const movieId = req.params.id;

  Axios.get(`https://yts.tl/api/v2/movie_details.json?movie_id=${movieId}`)
    .then(
      async ({
        data: {
          data: { movie }
        }
      }) => {
        movie.torrents.sort(
          (torrentA, torrentB) => torrentB.seeds - torrentA.seeds
        );
        if (movie.torrents[0].seeds > 0) {
          movieHelpers.downloadVideo(
            movieId,
            `magnet:?xt=urn:btih:${movie.torrents[0].hash}`
          );
          if (
            typeof movieHelpers.logHistory({
              _id: String(new mongoose.Types.ObjectId()),
              userId: "42",
              movieId,
              movieName: movie.title,
              date: Math.floor(Date.now())
            }) !== "string"
          ) {
            res.sendStatus(200);
          } else {
            res.sendStatus(500);
          }
        } else {
          res.sendStatus(409);
        }
      }
    )
    .catch((e) => {
      console.error(e.message);
      res.sendStatus(500);
    });
};

const receiveReviews = (req, res) => {
  const { movieId } = req.body;
  Axios.get(`https://yts.tl/api/v2/movie_details.json?movie_id=${movieId}`)
    .then(
      async ({
        data: {
          data: { movie }
        }
      }) => {
        if (movie.title && req.body.body && req.body.body.length < 1001) {
          const ret = await movieHelpers.saveReview({
            _id: new mongoose.Types.ObjectId(),
            movieId: req.body.movieId,
            movieName: movie.title,
            name: req.body.name,
            date: req.body.date,
            stars: req.body.stars,
            body: req.body.body
          });
          if (typeof ret !== "string") {
            const fullDate = String(new Date(req.body.date)).split(" ");
            ioConnection.ioConnection
              .to(req.body.movieId)
              .emit("New comments", {
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
      }
    )
    .catch((e) => {
      console.error(e.message);
      res.sendStatus(500);
    });
};

export default { getInfos, startDlVideo, receiveReviews };
