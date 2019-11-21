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

const sendMail = async () => true;

const createUser = async (user, insertPT) => {
  try {
    let hashedPT;
    if (insertPT) {
      hashedPT = `${user.picture.name.split(".")[0] + createRandomId(5)}.${
        user.picture.mimetype.split("/")[1]
      }`;
      user.picture.mv(`./server/data/avatar/${user.picture.name}`, (e) => {
        if (e) console.error(e);
      });
    } else {
      hashedPT = user.picture;
    }
    const hashedPW = bcrypt.hashSync(user.password, 10);
    const CompiledUser = new UserModel({
      _id: user._id,
      mail: user.mail,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      password: hashedPW,
      picture: hashedPT
    });
    await CompiledUser.save();
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default { sendMail, createUser };
