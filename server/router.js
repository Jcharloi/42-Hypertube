import express from 'express';

const router = express.Router();

router.post('/inscription', (req, res) => {
  console.log('inscription body:', req.body);
  setTimeout(() => {
    res.status(200).send({ missingInfos: false, nameTaken: false, emailTaken: false });
    // res.status(400).send({ missingInfos: false, nameTaken: true, emailTaken: true });
  }, 2000);
});

router.get('/check-token', (req, res) => { res.status(200).send({ validToken: false }); });

export default router;
