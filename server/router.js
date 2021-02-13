import express from "express";

import signUpController from "./Controllers/signUp";
import SignInControllers from "./Controllers/signIn";
import movieController from "./Controllers/movie";
import movieServices from "./Helpers/movie";
import searchController from "./Controllers/search";
import checkAuth from "./Helpers/auth";

const router = express.Router();

/* Static files */
router.use("/avatar", checkAuth, express.static("./server/data/avatar"));

/* User */
// create a new user
router.post("/users", signUpController.signUp);
router.put(
  "/users/:id/send-validation-email",
  signUpController.resendValidationEmail
);
router.put("/tokens/:value/verify-email", signUpController.verifyEmail);

/* Auth */
router.post("/users/login", SignInControllers);
router.get("/check-auth", checkAuth, (req, res) => {
  res.status(200).json({ validToken: true });
});

/* Search */
router.get("/search", checkAuth, searchController.search);

/* Movie */
router.get("/movies/recommended", checkAuth, movieServices.getRecommendation);
router.get("/movies/:id", checkAuth, movieController.getInfos);
router.post("/movies/:id/reviews", checkAuth, movieController.receiveReviews);
export default router;
