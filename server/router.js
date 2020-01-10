import express from "express";
import path from "path";

import signUpController from "./Controllers/signUp";
import searchController from "./Controllers/search";
import movieControllers from "./Controllers/movie";

const router = express.Router();

router.get("/search", searchController.search);

router.get("/check-token", (req, res) => {
  res.status(200).send({ validToken: true });
});

/* Sign Up */
router.post("/inscription", signUpController.signUp);

/* Movie */
router.get("/movie/infos/:id", movieControllers.getInfos);
router.get("/movie/download/:id", movieControllers.downloadVideo);
router.get("/movie/streaming/:id/:size", (req, res) => {
  const movieName = req.params.id;
  // const movieSize = req.params.size;
  const dest = `./server/data/movie/${movieName}`;
  const absolutePath = path.resolve(dest);

  // res.oldWriteHead = res.writeHead;
  // res.writeHead = (statusCode, headers) => {
  //   res.setHeader(
  //     "content-type",
  //     `${movieName.split(".")[movieName.split(".").length - 1]}`
  //   );
  //   res.setHeader("content-range", `bytes 0-`);
  //   res.setHeader("content-length", 0);
  //   res.oldWriteHead(statusCode, headers);
  // };
  // res.status(200).sendFile(absolutePath, {
  //   headers: {
  //     "Content-Type": "mp4",
  //     "Content-Length": fs.statSync(dest).size,
  //     "Accept-Range": "bytes",
  //     "Content-Range": `bytes -${fs.statSync(dest).size}`
  //   }
  // });
  res.status(200).sendFile(absolutePath);
});
router.post("/movie/review", movieControllers.receiveReviews);

// router.get("/data/avatar/:id", (req, res) => {
//   const pictureName = req.params.id;
//   const absolutePath = path.resolve(`./data/avatar/${pictureName}`);
//   res.status(200).sendFile(absolutePath);
// });

export default router;
