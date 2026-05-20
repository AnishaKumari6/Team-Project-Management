const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

exports.list = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    $or: [{ owner: req.user._id }, { members: req.user._id }],
  }).populate('owner members', 'name email');
  res.json(projects);
});

exports.create = asyncHandler(async (req, res) => {
  const project = await Project.create({ ...req.body, owner: req.user._id });
  res.status(201).json(project);
});

exports.update = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) { res.status(404); throw new Error('Project not found'); }
  res.json(project);
});

exports.remove = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) { res.status(404); throw new Error('Project not found'); }
  res.json({ message: 'Deleted' });
});
