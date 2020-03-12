import bcrypt from "bcrypt";

import UserModel from "../Schemas/User";

const createRandomId = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const changePicture = async (req, res) => {
  try {
    let hashedPT;
    console.log(req.body);
    hashedPT = `${req.name.split(".")[0] + createRandomId(5)}.${
      req.picture.mimetype.split("/")[1]
    }`;
    req.picture.mv(`./server/data/avatar/${hashedPT}`, (e) => {
      if (e) console.error(e);
    });
  } catch (e) {
    console.error(e.message);
    return e.name;
  }
};

export default changePicture;
