import express from "express";
import path from "path";

import movie from "./Controllers/movie";
import profile from "./Controllers/profile";
import user from "./Controllers/myprofile";
import signUpController from "./Controllers/signUp";
import searchController from "./Controllers/search";
import editUserInfo from "./Controllers/editprofile";
import changePassword from "./Controllers/changePassword";
import changePicture from "./Controllers/changePicture";

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
router.get("/user/:username", profile.getProfile);
router.get("/user", user.getUserInfos);
router.get("/user-comments/:username", profile.getUserComments);
router.put("/edit-profile/", editUserInfo.editUserInfo);
router.put("/change-password/", changePassword);
router.post("/change-picture/", changePicture);

router.get("/data/avatar/:id", (req, res) => {
  console.log("ICI");
  const pictureName = req.params.id;
  const absolutePath = path.resolve(`./server/data/avatar/${pictureName}`);
  res.status(200).sendFile(absolutePath);
});

export default router;
