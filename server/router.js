import express from "express";
import path from "path";

import controllers from "./Controllers/signUp";

import UserModel from "./Schemas/User";
import { sendValidateEmail } from "./Helpers/signUp";

const router = express.Router();

router.post("/inscription", controllers.signUp);
router.get("/check-token", (req, res) => {
  res.status(200).send({ validToken: false });
});

router.get("/data/avatar/:id", (req, res) => {
  const pictureName = req.params.id;
  const absolutePath = path.resolve(`./data/avatar/${pictureName}`);
  res.status(200).sendFile(absolutePath);
});

router.put("/verify-email/:id", async (req, res) => {
  try {
    // Updating db
    await UserModel.findByIdAndUpdate(req.params.id, { emailVerified: true });
    // sending Token
    // res.cookie("token", "YOUR TOKEN HERE IN THE FUTUR");
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(400).send();
  }
});

// Just to test sendValidateEmail
router.get("/test-mail/:id/:locale", async (req, res) => {
  console.log("req.params.id", req.params.id);
  const user = await UserModel.findById(req.params.id);
  try {
    await sendValidateEmail(user, req.params.locale);
    res.status(200).send("mail is gone");
  } catch (err) {
    console.log(err);
    res.status(400).send("errooor");
  }
});

export default router;
