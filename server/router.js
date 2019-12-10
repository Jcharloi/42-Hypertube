import express from "express";
import path from "path";

import controllers from "./Controllers/signUp";

import { sendMail } from "./nodemailer";

import enHtml from "./emailsHtml/confirmEmailAdress.en.html";
import frHtml from "./emailsHtml/confirmEmailAdress.fr.html";

const confirmEmailInfo = {
  en: {
    subject: "Confirm your email adress to watch some sick movies",
    text:
      "Welcome to Nethub\n\nWe just need to check that your email is really yours\nPlease go to this link to confirm your email adress:\nlocalhost:8080/confirm-email/id",
    html: enHtml
  },
  fr: {
    subject: "Confirme ton adresse email pour regarder des films stylés",
    text:
      "Bienvenue sur Hypertube\n\nOn doit juste vérifier que ton email t'apartiens bien\nVous pouvez aller sur ce lien pour confirmer votre adresse email:\nlocalhost:8080/confirm-email/id",
    html: frHtml
  }
};

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

// Just to test Front
router.put("/verify-email/:id", (req, res) => {
  console.log("confirming", req.params.id);
  res.cookie("testing shit", "working ?");
  res.status(200).send("verified !");
});

// Just to test sendMail
router.get("/test-mail/:locale", async (req, res) => {
  try {
    await sendMail({
      to: "fmuller@student.42.fr", // list of receivers
      ...confirmEmailInfo[req.params.locale]
    });
    res.status(200).send("mail is gone");
  } catch (err) {
    console.log(err);
    res.status(400).send("errooor");
  }
});

export default router;
