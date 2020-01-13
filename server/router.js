import express from "express";
import path from "path";

import movie from "./Controllers/movie";
import profile from "./Controllers/profile";

import signUpController from "./Controllers/signUp";
import searchController from "./Controllers/search";

const router = express.Router();

router.get("/search", searchController.search);

router.get("/check-token", (req, res) => {
  res.status(200).send({ validToken: true });
});

/* Sign Up */
router.post("/inscription", signUpController.signUp);

/* Movie */
router.get("/movie/infos/:id", movie.getInfos);
router.post("/movie/review", movie.receiveReviews);
router.post("/profile/get", profile.getProfile);

router.get("/data/avatar/:id", (req, res) => {
  const pictureName = req.params.id;
  const absolutePath = path.resolve(`./data/avatar/${pictureName}`);
  res.status(200).sendFile(absolutePath);
});

export default router;
