import express from 'express';

import { calcheck } from '../controllers/calcheck.controller.js';

const router = express.Router({mergeParams:true});


router.post('/caloriechecker',calcheck);


export default router;

