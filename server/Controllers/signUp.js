import fileType from "file-type";

import { createUser, sendValidateEmail } from "../Helpers/signUp";
import UserModel from "../Schemas/User";

const validEmail = (email) => {
  const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return email && regex.test(String(email));
};

const validPassword = (password) => {
  const regex = /(?=^.{8,}$)((?!.*\s)(?=.*[A-Z])(?=.*[a-z]))((?=(.*\d){1,})|(?=(.*\W){1,}))^.*$/;
  return password && regex.test(password);
};

const validFile = (file) => {
  const { name, size, data, mimetype: type } = file;
  const ab = new Uint8Array(data);
  const fileRes = fileType(ab);
  if (!name || !fileRes) {
    return false;
  }
  if (
    !type ||
    (type !== "image/png" && type !== "image/jpeg" && type !== "image/jpg") ||
    (fileRes.ext !== "png" && fileRes.ext !== "jpeg" && fileRes.ext !== "jpg")
  ) {
    return false;
  }
  if (!size || size > 1000000) {
    return false;
  }
  return true;
};

const emailIsFree = async (email) => {
  try {
    const users = await UserModel.findOne({ email });
    return users === null;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const usernameIsFree = async (username) => {
  try {
    const users = await UserModel.findOne({ username });
    return users === null;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const signUp = async (req, res) => {
  const goodInfos =
    validEmail(req.body.email) &&
    validPassword(req.body.password) &&
    req.files &&
    validFile(req.files.picture);
  const usernameFree = await usernameIsFree(req.body.username);
  const emailFree = await emailIsFree(req.body.email);

  if (goodInfos && usernameFree && emailFree) {
    let userCreated;

    // Creating user in database
    try {
      userCreated = await createUser(
        {
          email: req.body.email,
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password,
          picture: req.files.picture
        },
        true
      );
    } catch (err) {
      console.error(err.message);
      if (err.name === "ValidationError") {
        res
          .status(400)
          .send({ missingInfos: true, nameTaken: false, emailTaken: false });
      } else {
        res.status(500).send();
      }
    }

    // Sending confirmation email
    try {
      await sendValidateEmail(userCreated, req.body.locale || "en");
    } catch (err) {
      console.error(err);
    }

    res
      .status(200)
      .send({ missingInfos: false, nameTaken: false, emailTaken: false });
  } else {
    res.status(400).send({
      missingInfos: !goodInfos,
      nameTaken: !usernameFree,
      emailTaken: !emailFree
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    // Updating db
    await UserModel.findByIdAndUpdate(req.params.id, { emailVerified: true });

    // Sending auth token
    // res.cookie("token", "YOUR TOKEN HERE IN THE FUTUR");

    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(400).send();
  }
};
