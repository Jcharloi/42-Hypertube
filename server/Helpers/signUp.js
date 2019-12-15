import crypto from "crypto";
import bcrypt from "bcrypt";

import UserModel from "../Schemas/User";
import TokenModel from "../Schemas/Token";

import { sendEmail } from "../nodemailer";
import enHtml from "../emailsHtml/confirmEmailAdress.en.html";
import frHtml from "../emailsHtml/confirmEmailAdress.fr.html";

const confirmEmailInfo = {
  en: {
    subject: "Confirm your email adress to watch some sick movies",
    text:
      "Welcome to Nethub\n\nWe just need to check that your email is really yours\nPlease go to this link to confirm your email adress:\nlocalhost:8080/confirm-email/{{userId}}",
    html: enHtml
  },
  fr: {
    subject: "Confirme ton adresse email pour regarder des films stylés",
    text:
      "Bienvenue sur Hypertube\n\nOn doit juste vérifier que ton email t'apartiens bien\nVous pouvez aller sur ce lien pour confirmer votre adresse email:\nlocalhost:8080/confirm-email/{{userId}}",
    html: frHtml
  }
};

export const sendValidateEmail = async (user, locale) => {
  const emailInfo = confirmEmailInfo[locale];
  const token = await TokenModel.create({
    user: user._id
  });

  await sendEmail({
    to: user.email,
    ...emailInfo,
    // Setting unique url in html/text
    html: emailInfo.html.replace(
      /{{confirmUrl}}/g,
      `${process.env.CLIENT_ORIGIN}/confirm-email/${token.value}`
    ),
    text: emailInfo.text.replace(
      /{{confirmUrl}}/g,
      `${process.env.CLIENT_ORIGIN}/confirm-email/${token.value}`
    )
  });
};

export const createUser = async (user, insertPT) => {
  let hashedPT;
  if (insertPT) {
    hashedPT = `${user.picture.name.split(".")[0] +
      crypto.randomBytes(5).toString("hex")}.${
      user.picture.mimetype.split("/")[1]
    }`;
    user.picture.mv(`./server/data/avatar/${hashedPT}`, (e) => {
      if (e) console.error(e);
    });
  } else {
    hashedPT = user.picture;
  }
  const hashedPW = bcrypt.hashSync(user.password, 10);
  return UserModel.create({
    ...user,
    password: hashedPW,
    picture: hashedPT
  });
};
