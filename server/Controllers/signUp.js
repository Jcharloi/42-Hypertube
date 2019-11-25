import fileType from "file-type";

import signUpHelpers from "../Helpers/signUp";
import UserModel from "../Schemas/User";
import mongoose from "../mongo";

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

const usernamIsFree = async (username) => {
  try {
    const users = await UserModel.findOne({ username });
    return users === null;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const signUp = async (req, res) => {
  const goodInfos =
    validEmail(req.body.email) &&
    validPassword(req.body.password) &&
    req.files &&
    validFile(req.files.picture);
  const usernameFree = await usernamIsFree(req.body.username);
  const emailFree = await emailIsFree(req.body.email);
  if (goodInfos && usernameFree && emailFree) {
    if (await signUpHelpers.sendEmail()) {
      const user = {
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        picture: req.files.picture
      };
      const ret = await signUpHelpers.createUser(user, true);
      if (ret === "ValidationError") {
        res
          .status(400)
          .send({ missingInfos: true, nameTaken: false, emailTaken: false });
      } else if (ret === true) {
        res
          .status(200)
          .send({ missingInfos: false, nameTaken: false, emailTaken: false });
      } else {
        res.status(500).send();
      }
    } else {
      res.status(500).send();
    }
  } else {
    res.status(400).send({
      missingInfos: !goodInfos,
      nameTaken: !usernameFree,
      emailTaken: !emailFree
    });
  }
};

export default { signUp };
