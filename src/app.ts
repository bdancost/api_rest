import "dotenv/config";
import express, { Request, Response, Application } from "express";
import { sequelize, Task } from "./models"; // Importa do arquivo de modelos

const app: Application = express();
app.use(express.json());

// Interface para tipagem das Tasks (ajuste conforme seu modelo)
interface ITask {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Conexão com o banco e inicialização do servidor
async function initializeApp(): Promise<void> {
  try {
    // Testa a conexão e sincroniza os modelos
    await sequelize.authenticate();
    await sequelize.sync(); // Sincroniza modelos com o banco (opcional)
    console.log("✅ Banco de dados conectado e sincronizado!");

    // Inicia o servidor
    const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("💥 Falha na inicialização:", error);
    process.exit(1); // Encerra o processo com erro
  }
}

// Rotas
app.get("/", (req: Request, res: Response) => {
  res.send("🔥 TÁ FUNFANDO COM TYPESCRIPT!");
});

// Rota de exemplo usando o modelo Task
app.get("/tasks", async (req: Request, res: Response) => {
  try {
    const tasks: ITask[] = await Task.findAll();
    res.json(tasks);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
});

// Inicializa a aplicação
initializeApp();

export default app; // Exporta para testes
