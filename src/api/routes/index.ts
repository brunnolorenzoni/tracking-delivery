import { Router } from 'express';

import deliveryRouter from './delivery';

const router = Router();

router.use('/delivery', deliveryRouter);

export default router;