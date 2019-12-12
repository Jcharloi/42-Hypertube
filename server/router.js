import express from "express";

import { signUp, verifyEmail } from "./Controllers/signUp";

const router = express.Router();

// Static files
router.use("/avatar", express.static("./server/data/avatar"));

// Users
router.post("/users", signUp);
router.put("/tokens/:value/verify-email", verifyEmail);

// Other
router.get("/check-token", (req, res) => {
  res.status(200).send({ validToken: false });
});

export default router;
