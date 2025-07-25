import { Request, Response } from "express";
import { Task } from "../models/index";

/**
 * CONTROLLER DE TAREFAS (TASKS)
 *
 * Implementa todas as operações CRUD (Create, Read, Update, Delete) para tarefas.
 * Usa Sequelize para interação com o banco de dados e Express para rotas HTTP.
 */

/**
 * GET /tasks
 * @description Retorna TODAS as tarefas do banco de dados.
 * @returns {Task[]} Lista de tarefas em JSON
 * @throws {500} Erro interno do servidor
 */
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error("Get all tasks error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * POST /tasks
 * @description Cria uma NOVA tarefa no banco.
 * @param {string} req.body.title - Título da tarefa (obrigatório)
 * @param {string} [req.body.description] - Descrição opcional
 * @param {boolean} [req.body.completed=false] - Status de completude
 * @returns {Task} A tarefa criada
 * @throws {400} Dados inválidos
 * @throws {500} Erro interno
 */
export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error);
    res.status(400).json({ error: "Bad request - Invalid data" });
  }
};

/**
 * PUT /tasks/:id
 * @description Atualiza uma tarefa EXISTENTE.
 * @param {string} req.params.id - ID da tarefa
 * @param {string} [req.body.title] - Novo título (opcional)
 * @param {boolean} [req.body.completed] - Novo status (opcional)
 * @returns {Task} Tarefa atualizada
 * @throws {404} Tarefa não encontrada
 * @throws {500} Erro interno
 */
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Atualiza apenas campos enviados
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * DELETE /tasks/:id
 * @description APAGA uma tarefa do banco.
 * @param {string} req.params.id - ID da tarefa
 * @returns {204} No Content (sucesso sem retorno)
 * @throws {404} Tarefa não encontrada
 * @throws {500} Erro interno
 */
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.destroy();
    res.status(204).send(); // Sem conteúdo
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
