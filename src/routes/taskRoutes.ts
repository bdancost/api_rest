const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// GET /tasks → Lista todas as tarefas
router.get("/", taskController.getAllTasks);

// POST /tasks → Cria uma nova tarefa
router.post("/", taskController.createTask);

module.exports = router;
