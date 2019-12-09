import express from "express";
import path from "path";

import signUp from "./Controllers/signUp";
import movie from "./Controllers/movie";

const router = express.Router();

router.get("/check-token", (req, res) => {
  res.status(200).send({ validToken: true });
});

/* Sign Up */
router.post("/inscription", signUp.signUp);

/* Movie */
router.put("/movie/send-comment", movie.sendComment);

router.get("/data/avatar/:id", (req, res) => {
  const pictureName = req.params.id;
  const absolutePath = path.resolve(`./data/avatar/${pictureName}`);
  res.status(200).sendFile(absolutePath);
});

export default router;
