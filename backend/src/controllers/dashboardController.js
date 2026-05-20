const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');
const Project = require('../models/Project');

exports.stats = asyncHandler(async (req, res) => {
  const [totalProjects, totalTasks, byStatus] = await Promise.all([
    Project.countDocuments({ $or: [{ owner: req.user._id }, { members: req.user._id }] }),
    Task.countDocuments(),
    Task.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
  ]);
  res.json({ totalProjects, totalTasks, byStatus });
});
