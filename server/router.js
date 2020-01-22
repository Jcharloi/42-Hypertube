import express from "express";
import path from "path";

import movieController from "./Controllers/movie";
import signUpController from "./Controllers/signUp";
import SignInControllers from "./Controllers/signIn";
import searchController from "./Controllers/search";
import checkAuth from "./Helpers/auth";

const router = express.Router();

/* User */
router.post("/inscription", signUpController.signUp);
router.post("/user/login", SignInControllers);

router.get("/check-auth", checkAuth, (req, res) => {
  res.status(200).json({ validToken: true });
});

/* Search */
router.get("/search", checkAuth, searchController.search);

/* Movie */
router.get("/movie/infos/:id", checkAuth, movieController.getInfos);
router.post("/movie/review", checkAuth, movieController.receiveReviews);

router.get("/data/avatar/:id", checkAuth, (req, res) => {
  const pictureName = req.params.id;
  const absolutePath = path.resolve(`./data/avatar/${pictureName}`);
  res.status(200).sendFile(absolutePath);
});

export default router;
