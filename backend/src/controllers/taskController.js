const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

exports.list = asyncHandler(async (req, res) => {
  const filter = req.query.project ? { project: req.query.project } : {};
  const tasks = await Task.find(filter).populate('assignee', 'name email');
  res.json(tasks);
});

exports.create = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

exports.update = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) { res.status(404); throw new Error('Task not found'); }
  res.json(task);
});

exports.remove = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) { res.status(404); throw new Error('Task not found'); }
  res.json({ message: 'Deleted' });
});
