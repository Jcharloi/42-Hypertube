import fileType from "file-type";
import signUpHelpers from "../Helpers/signUp";
import UserModel from "../Schemas/User";

const validMail = (mail) => {
  const regex = new RegExp(
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  );
  if (!mail || !regex.test(String(mail).toLowerCase())) {
    return false;
  }
  return true;
};

const validPassword = (password) => {
  const regex = new RegExp(
    /(?=^.{8,}$)((?!.*\s)(?=.*[A-Z])(?=.*[a-z]))((?=(.*\d){1,})|(?=(.*\W){1,}))^.*$/
  );
  if (!password || !regex.test(password) || password.length > 50) {
    return false;
  }
  return true;
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
    (fileRes.ext !== "png" && fileRes.ext !== "jpg")
  ) {
    return false;
  }
  if (!size || size > 1000000) {
    return false;
  }
  return true;
};

const mailAlreadyExists = async (mail) => {
  try {
    const users = await UserModel.find({ mail });
    return users.length === 0;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const nameAlreadyExists = async (userName) => {
  try {
    const users = await UserModel.find({ userName });
    return users.length === 0;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const signUp = async (req, res) => {
  const goodInfos =
    req.body.userName &&
    req.body.userName.length < 21 &&
    req.body.firstName &&
    req.body.lastName &&
    validMail(req.body.mail) &&
    validPassword(req.body.password) &&
    req.files &&
    validFile(req.files.picture);
  const nameFree = await nameAlreadyExists(req.body.userName);
  const mailFree = await mailAlreadyExists(req.body.mail);
  if (goodInfos && nameFree && mailFree) {
    if (await signUpHelpers.sendMail()) {
      const user = {
        mail: req.body.mail,
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        picture: req.files.picture
      };
      if (await signUpHelpers.createUser(user)) {
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
