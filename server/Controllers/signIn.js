import bcrypt from "bcrypt";

import { setAccesTokenCookie } from "../Helpers/signIn";
import UserModel from "../Schemas/User";

const signIn = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      const user = await UserModel.findOne(
        { username },
        "password emailVerified"
      );

      if (user && (await bcrypt.compare(password, user.password))) {
        if (user.emailVerified) {
          setAccesTokenCookie(res, user.id);
          res.sendStatus(200);
        } else {
          res.status(400).send({ error: "EMAIL_NOT_VERIFIED" });
        }
      } else {
        res.status(400).send({ error: "BAD_CREDENTIALS" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  } else {
    res.status(400).send();
  }
};

export default signIn;
