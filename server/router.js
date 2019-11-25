import express from "express";
import path from "path";

import controllers from "./Controllers/signUp";

const router = express.Router();

// router.post("/inscription", (req, res) => {
//   console.log("inscription body:", req.body);
//   setTimeout(() => {
//     res
//       .status(200)
//       .send({ missingInfos: false, nameTaken: false, emailTaken: false });
//     // res.status(400).send({ missingInfos: false, nameTaken: true, emailTaken: true });
//   }, 2000);
// });

router.post("/inscription", controllers.signUp);
router.get("/check-token", (req, res) => {
  res.status(200).send({ validToken: false });
});

router.get("/data/avatar/:id", (req, res) => {
  const pictureName = req.params.id;
  const absolutePath = path.resolve(`./data/avatar/${pictureName}`);
  res.status(200).sendFile(absolutePath);
});

export default router;
