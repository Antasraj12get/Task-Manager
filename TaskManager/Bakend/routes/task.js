// routes/tasks.js
import express from 'express';

const router = express.Router();

// Sample route
router.get('/', (req, res) => {
  res.json({ message: 'Tasks route is working' });
});

export default router;
