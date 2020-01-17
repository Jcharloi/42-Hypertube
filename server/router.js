import express from "express";
import path from "path";

import controllers from "./Controllers/signUp";
import SignInControllers from "./Controllers/signIn";

const router = express.Router();

router.post("/inscription", controllers.signUp);
router.post("/user/login", SignInControllers);
router.get("/check-token", (req, res) => {
  res.status(200).send({ validToken: false });
});

router.get("/data/avatar/:id", (req, res) => {
  const pictureName = req.params.id;
  const absolutePath = path.resolve(`./data/avatar/${pictureName}`);
  res.status(200).sendFile(absolutePath);
});

export default router;
