import bcrypt from "bcrypt";
import UserModel from "../Schemas/User";

const signIn = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      const user = await UserModel.findOne({ username }, "password");
      if (user && (await bcrypt.compare(password, user.password))) {
        // todo: set cookie with jwt here
        res.status(200).send();
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
