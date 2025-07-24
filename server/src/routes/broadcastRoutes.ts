import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/broadcast', authMiddleware(['admin']), async (req, res) => {

});

router.get('/broadcast', authMiddleware(), async (req, res) => {

})

router.post('/seen-broadcast', authMiddleware(), (req, res) => {

})

router.post('/disabl-broadcast', authMiddleware(), (req, res) => {

})

router.post('/enable-broadcast', authMiddleware(), (req, res) => {

})

export const broadcastRouter = router;
