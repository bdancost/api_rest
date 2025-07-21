import { Request, Response } from "express";

const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Supondo que User já está em TS

// Interface para o payload do token
interface TokenPayload {
  userId: string;
}

// Interface para o corpo da requisição
interface RegisterRequest {
  email: string;
  password: string;
}

export const register = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    // Criar usuário
    const user = await User.create({ email, password });

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user._id.toString() } as TokenPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Retornar resposta
    res.status(201).json({ token });
  } catch (err: unknown) {
    // Tratamento de erro tipado
    if (err instanceof Error) {
      console.error("Erro no registro:", err.message);
    }

    res.status(400).json({ error: "Erro ao criar usuário" });
  }
};
