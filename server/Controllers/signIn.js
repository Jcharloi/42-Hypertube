import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../Schemas/User";

// tood: reduce this time and implement refresh token
const ACCES_TOKEN_EXPIRATION = 86400; // 24h in secondes

const signIn = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      const user = await UserModel.findOne({ username }, "password");

      if (user && (await bcrypt.compare(password, user.password))) {
        const accesToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: ACCES_TOKEN_EXPIRATION
        });

        res
          .cookie("accesToken", accesToken, {
            httpOnly: true,
            // todo: add `secure: true` to only send token in https
            // secure: true,
            maxAge: ACCES_TOKEN_EXPIRATION * 1000
          })
          .status(200)
          .send();
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
