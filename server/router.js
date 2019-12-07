import express from "express";
import path from "path";

import controllers from "./Controllers/signUp";

import { sendMail } from "./nodemailer";

import emailHtml from "./emailsHtml/confirmEmailAdress.html";

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

router.get("/test-mail", async (req, res) => {
  try {
    await sendMail({
      to: "fmuller@student.42.fr", // list of receivers
      subject: "Confirm your email adress to watch some sick movies", // Subject line
      text: `Welcome to Nethub\n\nWe just need to check that your email is really yours\nPlease go to this link to confirm your email adress:\nlocalhost:8080/confirm-email/id`, // plain text body
      html: emailHtml // html body
    });
    res.status(200).send("mail is gone");
  } catch (err) {
    console.log(err);
    res.status(400).send("errooor");
  }
});

export default router;
