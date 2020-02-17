import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  const { accesToken } = req.cookies;

  if (accesToken) {
    try {
      const { id } = jwt.verify(accesToken, process.env.SECRET_KEY);
      req.userId = id;
      next();
    } catch (e) {
      if (e.name === "TokenExpiredError") {
        res.status(400).send({ error: "EXPIRED_TOKEN", validToken: false });
      } else if (
        e.name === "JsonWebTokenError" ||
        e.name === "NotBeforeError"
      ) {
        res.status(400).send({ error: "BAD_TOKEN", validToken: false });
      } else {
        res.status(500).send();
      }
    }
  } else {
    res.status(400).send({ error: "NO_ACCES_TOKEN", validToken: false });
  }
};

export default checkToken;
