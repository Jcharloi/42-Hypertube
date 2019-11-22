import express from 'express';

const router = express.Router();

router.post('/inscription', (req, res) => {
  console.log('inscription body:', req.body);
  // res.status(200).send({ missingInfos: false, nameTaken: false, emailTaken: false });
  res.status(400).send({ missingInfos: false, nameTaken: true, emailTaken: true });
});

router.get('/check-token', (req, res) => { res.status(200).send({ validToken: false }); });

export default router;
