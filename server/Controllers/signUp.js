import fileType from "file-type";

import signUpHelpers from "../Helpers/signUp";
import UserModel from "../Schemas/User";
import mongoose from "../mongo";

const validMail = (mail) => {
  const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return mail && regex.test(String(mail));
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

const mailDoesNotExists = async (mail) => {
  try {
    const users = await UserModel.findOne({ mail });
    return users === null;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const nameDoesNotExists = async (userName) => {
  try {
    const users = await UserModel.findOne({ userName });
    return users === null;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const signUp = async (req, res) => {
  const goodInfos =
    validMail(req.body.mail) &&
    validPassword(req.body.password) &&
    req.files &&
    validFile(req.files.picture);
  const nameFree = await nameDoesNotExists(req.body.userName);
  const mailFree = await mailDoesNotExists(req.body.mail);
  if (goodInfos && nameFree && mailFree) {
    if (await signUpHelpers.sendMail()) {
      const user = {
        _id: new mongoose.Types.ObjectId(),
        mail: req.body.mail,
        verifiedMail: false,
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        picture: req.files.picture
      };
      const ret = await signUpHelpers.createUser(user, true);
      if (ret === "ValidationError") {
        res
          .status(200)
          .send({ missingInfos: true, nameTaken: false, mailTaken: false });
      } else if (ret === true) {
        res
          .status(200)
          .send({ missingInfos: false, nameTaken: false, mailTaken: false });
      } else {
        res.status(500).send();
      }
    } else {
      res.status(500).send();
    }
  } else {
    res.status(200).send({
      missingInfos: !goodInfos,
      nameTaken: !nameFree,
      mailTaken: !mailFree
    });
  }
};

export default { signUp };
