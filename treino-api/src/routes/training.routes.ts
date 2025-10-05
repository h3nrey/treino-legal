import { Router } from 'express';
import * as controller from '../controllers/training.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', controller.list);
router.get('/favorited', authMiddleware, controller.listFavoritedByUser);
router.delete('/:id/favorites', authMiddleware, controller.unfavoriteTraining);
router.post('/:id/favorites', authMiddleware, controller.favorite);
router.get('/:id/related', controller.listRelated);
router.get('/:id', controller.findOne);
router.post('/', authMiddleware, controller.create);

export default router;
