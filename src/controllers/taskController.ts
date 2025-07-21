import { Request, Response } from "express";

const Task = require("../models/Task");

// Interface para o corpo da requisição de criação
interface CreateTaskRequest {
  title: string;
}

// Interface para a resposta da tarefa (opcional, pode usar do model)
interface TaskResponse {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const getAllTasks = async (
  req: Request,
  res: Response<TaskResponse[] | { error: string }>
) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Erro desconhecido";
    res.status(500).json({ error: errorMessage });
  }
};

export const createTask = async (
  req: Request<{}, {}, CreateTaskRequest>,
  res: Response<TaskResponse | { error: string }>
) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Título é obrigatório" });
    }

    const newTask = await Task.create({ title, completed: false });
    res.status(201).json(newTask);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Erro desconhecido";
    res.status(500).json({ error: errorMessage });
  }
};
