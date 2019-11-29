import express from "express";
import path from "path";
import jwt from "jsonwebtoken";
import passport from "./passport-config";

import controllers from "./Controllers/signUp";

const router = express.Router();

router.post("/inscription", controllers.signUp);
router.get("/check-token", (req, res) => {
  res.status(200).send({ validToken: false });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email", "profile"],
    session: false
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/sign-up" }),
  function(req, res) {
    const token = jwt.sign(
      { userName: req.user.displayName },
      process.env.SECRET
    );
    res.cookie("user", token, {
      maxAge: 1000000,
      httpOnly: true
    });
    res.redirect(`/`);
  }
);

router.get("/data/avatar/:id", (req, res) => {
  const pictureName = req.params.id;
  const absolutePath = path.resolve(`./data/avatar/${pictureName}`);
  res.status(200).sendFile(absolutePath);
});

export default router;
