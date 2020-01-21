import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  const { accesToken } = req.cookies;

  if (accesToken) {
    // todo: use `process.env.SECRET_KEY` when dotenv is available
    try {
      const { id } = jwt.verify(accesToken, "6w9z$C&F)J@NcRfU");
      req.userId = id;
      next();
    } catch (e) {
      console.log("error: ", e);
      res.status(500).send({ validToken: false });
    }
  } else {
    res.status(400).send({ error: "NO_TOKEN", validToken: false });
  }
};

export default checkToken;
