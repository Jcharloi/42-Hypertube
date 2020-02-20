import express from "express";

import signUpController from "./Controllers/signUp";
import movieController from "./Controllers/movie";
import searchController from "./Controllers/search";

const router = express.Router();

// Static files
router.use("/avatar", express.static("./server/data/avatar"));

// Users
router.post("/users", signUpController.signUp);
router.put(
  "/users/:id/send-validation-email",
  signUpController.resendValidationEmail
);
router.put("/tokens/:value/verify-email", signUpController.verifyEmail);

// Movies
router.get("/search", searchController.search);
router.get("/movie/infos/:id", movieController.getInfos);
router.post("/movie/review", movieController.receiveReviews);

// Other
router.get("/check-token", (req, res) => {
  res.status(200).send({ validToken: false });
});

export default router;
