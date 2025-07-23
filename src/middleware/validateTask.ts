import { Request, Response, NextFunction } from "express";

// Validação para criação de tarefa
export const validateTaskCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, completed } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Title must be a non-empty string" });
  }

  if (title.length < 3) {
    return res
      .status(400)
      .json({ error: "Title must be at least 3 characters" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ error: "Completed must be a boolean if provided" });
  }

  next();
};

// Validação para atualização (mais flexível)
export const validateTaskUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, completed } = req.body;

  if (title && typeof title !== "string") {
    return res.status(400).json({ error: "Title must be a string" });
  }

  if (title && title.length < 3) {
    return res
      .status(400)
      .json({ error: "Title must be at least 3 characters" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "Completed must be a boolean" });
  }

  next();
};

// Validação de ID (comum para PUT/DELETE)
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
