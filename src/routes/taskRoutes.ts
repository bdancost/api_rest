import { Router } from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import {
  validateTaskCreate,
  validateTaskUpdate,
  validateTaskId,
} from "../middleware/validateTask";

const router = Router();

// Rota GET não precisa de validação de body
router.get("/", getAllTasks);

// Rota POST valida o corpo da requisição
router.post("/", validateTaskCreate, createTask);

// Rota PUT valida tanto o ID quanto o body
router.put("/:id", validateTaskId, validateTaskUpdate, updateTask);

// Rota DELETE valida apenas o ID
router.delete("/:id", validateTaskId, deleteTask);

export default router;
