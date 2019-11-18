import express from 'express';

const router = express.Router();

router.get('/check-token', (req, res) => { res.status(200).send({ validToken: false }); });

export default router;
