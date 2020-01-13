import Axios from "axios";

import movieHelpers from "../Helpers/movie";
import mongoose from "../mongo";
import UserModel from "../Schemas/User";
import ioConnection from "..";
import { CustomConsole } from "@jest/console";

const usernameIsFree = async username => {
  try {
    const users = await UserModel.findOne({ username });
    return users === null;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const getProfile = async (req, res) => {
  console.log(req.body.username);
  if (!(await usernameIsFree(req.body.username))) {
    res.status(200).send({ test: "user trouvé" });
  } else {
    res.status(200).send({ test: "user non existant" });
  }
};

export default { getProfile };
