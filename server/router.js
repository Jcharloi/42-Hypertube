import express from "express";
import path from "path";

import profile from "./Controllers/profile";
import user from "./Controllers/myprofile";

import signUpController from "./Controllers/signUp";
import SignInControllers from "./Controllers/signIn";
import movieController from "./Controllers/movie";
import searchController from "./Controllers/search";
import editUserInfo from "./Controllers/editprofile";
import changePassword from "./Controllers/changePassword";
import changePicture from "./Controllers/changePicture";
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
// router.get("/movie/infos/:id", movie.getInfos);
// router.post("/movie/review", movie.receiveReviews);
router.get("/user/:username", profile.getProfile);
router.get("/user", checkAuth, user.getUserInfos);
router.get("/user-comments/:username", checkAuth, profile.getUserComments);
router.put("/edit-profile/", checkAuth, editUserInfo.editUserInfo);
router.put("/change-password/", checkAuth, changePassword);
router.post("/change-picture/", checkAuth, changePicture);

router.get("/data/avatar/:id", (req, res) => {
  const pictureName = req.params.id;
  const absolutePath = path.resolve(`./server/data/avatar/${pictureName}`);
  res.status(200).sendFile(absolutePath);
});
router.get("/movies/:id", checkAuth, movieController.getInfos);
router.post("/movies/:id/reviews", checkAuth, movieController.receiveReviews);

export default router;
