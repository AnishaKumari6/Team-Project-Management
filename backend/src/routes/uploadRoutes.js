const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: (_req, _f, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (_req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')),
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/', protect, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file' });
  res.json({ url: `/uploads/${req.file.filename}`, name: req.file.originalname });
});

module.exports = router;
