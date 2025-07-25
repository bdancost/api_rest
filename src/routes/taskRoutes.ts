// Importa o Router do Express para criar um roteador de endpoints
import { Router } from "express";

// Importa os controladores que contêm a lógica de negócio para cada operação com tarefas
import {
  getAllTasks, // Obtém todas as tarefas
  createTask, // Cria uma nova tarefa
  updateTask, // Atualiza uma tarefa existente
  deleteTask, // Remove uma tarefa
} from "../controllers/taskController";

// Importa os middlewares de validação
import {
  validateTaskCreate, // Valida dados para criação de tarefa
  validateTaskUpdate, // Valida dados para atualização de tarefa
  validateTaskId, // Valida se o ID da tarefa é válido
} from "../middleware/validateTask";

// Cria uma instância de roteador Express
const router = Router();

/**
 * @route GET /tasks
 * @description Lista todas as tarefas cadastradas
 * @access Public
 * @returns {Array<Task>} 200 - Array de objetos de tarefa
 * @returns {Error} 500 - Erro interno do servidor
 */
router.get("/", getAllTasks);

/**
 * @route POST /tasks
 * @description Cria uma nova tarefa
 * @access Public
 * @param {string} title.body.required - Título da tarefa
 * @param {string} description.body - Descrição opcional
 * @param {boolean} completed.body - Status de completude (default: false)
 * @returns {Task} 201 - Tarefa criada com sucesso
 * @returns {Error} 400 - Dados inválidos na requisição
 * @returns {Error} 500 - Erro interno do servidor
 */
router.post("/", validateTaskCreate, createTask);

/**
 * @route PUT /tasks/:id
 * @description Atualiza uma tarefa existente
 * @access Public
 * @param {string} id.path.required - ID da tarefa a ser atualizada
 * @param {string} title.body - Novo título (opcional)
 * @param {string} description.body - Nova descrição (opcional)
 * @param {boolean} completed.body - Novo status (opcional)
 * @returns {Task} 200 - Tarefa atualizada com sucesso
 * @returns {Error} 400 - Dados inválidos na requisição
 * @returns {Error} 404 - Tarefa não encontrada
 * @returns {Error} 500 - Erro interno do servidor
 */
router.put("/:id", validateTaskId, validateTaskUpdate, updateTask);

/**
 * @route DELETE /tasks/:id
 * @description Remove uma tarefa existente
 * @access Public
 * @param {string} id.path.required - ID da tarefa a ser removida
 * @returns 204 - Tarefa removida com sucesso (no content)
 * @returns {Error} 404 - Tarefa não encontrada
 * @returns {Error} 500 - Erro interno do servidor
 */
router.delete("/:id", validateTaskId, deleteTask);

// Exporta o roteador configurado para ser usado no aplicativo principal
export default router;
