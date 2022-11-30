const mongoose = require("mongoose");

const { nanoid } = require("nanoid");

const taskSchema = new mongoose.Schema({
  task_id: {
    type: Number,
    required: true,
  },
  task_name: {
    type: String,
    required: true,
  },
  is_completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
