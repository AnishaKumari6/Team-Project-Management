const router = require('express').Router();
const c = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');
router.use(protect);
router.route('/').get(c.list).post(c.create);
router.route('/:id').put(c.update).delete(authorize('admin', 'manager'), c.remove);
module.exports = router;
