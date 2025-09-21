import { Router } from 'express';
import * as controller from '../controllers/training.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', controller.list);
router.get('/:id/related', controller.listRelated);
router.get('/:id', controller.findOne);
router.post('/', authMiddleware, controller.create);
router.post('/favorites/:id', authMiddleware, controller.favorite);
router.delete('/favorites/:id', authMiddleware, controller.unfavoriteTraining);

export default router;
