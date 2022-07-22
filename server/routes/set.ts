import express from 'express';
import controller from '../controllers/set';

const router = express.Router();

router.get('/read/:setID', controller.read);
router.get('/query/:authorID', controller.query);
router.post('/create', controller.create);
router.patch('/update/:setID', controller.update);
router.delete('/:setID', controller.deleteSet);
router.get('/:authorID', controller.readAll);

export = router;
