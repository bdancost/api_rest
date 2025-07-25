import { Request, Response, NextFunction } from "express";

/**
 * MIDDLEWARE DE VALIDAÇÃO PARA TAREFAS
 *
 * Implementa validações para operações CRUD de tarefas:
 * - Criação (validateTaskCreate)
 * - Atualização (validateTaskUpdate)
 * - ID (validateTaskId)
 */

/**
 * Validação para CRIAÇÃO de tarefas
 * @middleware
 * @param {Request} req - Objeto da requisição
 * @param {Response} res - Objeto da resposta
 * @param {NextFunction} next - Próxima função no pipeline
 * @throws {400} Se:
 * - Título não for string
 * - Título tiver menos de 3 caracteres
 * - Completed não for booleano (quando fornecido)
 */
export const validateTaskCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, completed } = req.body;

  // Validação obrigatória do título
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Title must be a non-empty string" });
  }

  // Tamanho mínimo do título
  if (title.length < 3) {
    return res
      .status(400)
      .json({ error: "Title must be at least 3 characters" });
  }

  // Validação opcional do completed
  if (completed !== undefined && typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ error: "Completed must be a boolean if provided" });
  }

  next();
};

/**
 * Validação para ATUALIZAÇÃO de tarefas
 * @middleware
 * @description Mais flexível que a criação (campos opcionais)
 * @throws {400} Se:
 * - Título não for string (quando fornecido)
 * - Título tiver menos de 3 caracteres (quando fornecido)
 * - Completed não for booleano (quando fornecido)
 */
export const validateTaskUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, completed } = req.body;

  // Validação condicional do título
  if (title && typeof title !== "string") {
    return res.status(400).json({ error: "Title must be a string" });
  }

  if (title && title.length < 3) {
    return res
      .status(400)
      .json({ error: "Title must be at least 3 characters" });
  }

  // Validação condicional do completed
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "Completed must be a boolean" });
  }

  next();
};

/**
 * Validação de ID para operações específicas
 * @middleware
 * @description Usado em PUT/DELETE para validar IDs numéricos
 * @throws {400} Se ID não for um número válido
 */
export const validateTaskId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID must be a number" });
  }

  next();
};
