import { Request, Response } from "express";
import db from "../models";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await db.Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await db.Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

// Atualizar uma tarefa existente
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    // Verifica se a tarefa existe
    const task = await db.Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Atualiza apenas os campos fornecidos
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Deletar uma tarefa
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await db.Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.destroy();

    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
