const express = require("express");
const connection = require("./config");
const Task = require("./models/taskModel");
const app = express();

app.use(express.json());

// app.post("/v1/tasks", async (req, res) => {
//   const { title } = req.body;
//   const data = await Task.create({
//     task_id: (await Task.find().count()) + 1,
//     task_name: title,
//   });

//   if (data) {
//     res.status(201).json({ id: data.task_id });
//   }
// });

app.post("/v1/tasks", async (req, res) => {
  const { tasks } = req.body;
  let id = [];
  console.log(tasks);
  for (task of tasks) {
    console.log("hi");
    const data = await Task.create({
      task_id: (await Task.find().count()) + 1,
      task_name: task.task_name,
    });
    id.push({ id: data.task_id });
  }
  console.log(id);
  res.status(201);
  res.send(id);
});

app.get("/v1/tasks", async (req, res) => {
  const data = await Task.find();

  if (data) {
    res.status(200).json(data);
  }
});

app.get("/v1/tasks/:id", async (req, res) => {
  //const { id } = req.url;

  const len = req.url.split("/").length;
  const id = req.url.split("/")[len - 1];
  const data = await Task.find({ task_id: id });
  if (data.length !== 0) {
    res.status(200).json(data);
  } else {
    res.status(400).json({
      error: "There is no task with that id",
    });
  }
});

// app.delete("/v1/tasks/:id", async (req, res) => {
//   const len = req.url.split("/").length;
//   const id = req.url.split("/")[len - 1];
//   const data = await Task.deleteOne({ task_id: id });
//   res.status(204).send();
// });
app.delete("/v1/tasks", async (req, res) => {
  const { tasks } = req.body;
  for (let task of tasks) {
    const data = await Task.deleteOne({ task_id: task.id });
  }
  res.status(204).send();
});
app.put("/v1/tasks/:id", async (req, res) => {
  const len = req.url.split("/").length;
  const id = req.url.split("/")[len - 1];

  const { title, status } = req.body;

  const data = await Task.findOneAndUpdate(
    { task_id: id },
    { task_name: title, is_completed: status }
  );
  if (data) {
    res.status(204).send();
  } else {
    res.status(404).json({
      error: "There is no task with that id",
    });
  }
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
