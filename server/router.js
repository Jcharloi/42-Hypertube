import express from "express";
import path from "path";

import controllers from "./Controllers/signUp";
import SignInControllers from "./Controllers/signIn";

import checkAuth from "./Helpers/auth";

const router = express.Router();

router.post("/inscription", controllers.signUp);
router.post("/user/login", SignInControllers);
router.get("/check-auth", checkAuth, (req, res) => {
  res.status(200).json({ validToken: true });
});

router.get("/data/avatar/:id", checkAuth, (req, res) => {
  const pictureName = req.params.id;
  const absolutePath = path.resolve(`./data/avatar/${pictureName}`);
  res.status(200).sendFile(absolutePath);
});

export default router;
