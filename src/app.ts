import "dotenv/config";
import express, { Request, Response, Application } from "express";
import sequelize from "./models"; // Importa do arquivo de modelos
import Task from "./models/task"; // Importa seu modelo Task

const app: Application = express();
app.use(express.json());

const TaskModel = Task(sequelize);

// Verificação simplificada das variáveis essenciais
const requiredVars = [
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_HOST",
  "DB_DIALECT",
];
const missingVars = requiredVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`❌ Variáveis de ambiente faltando: ${missingVars.join(", ")}`);
  process.exit(1);
}

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
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ Banco conectado!");

    const PORT = parseInt(process.env.PORT as string, 10) || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("💥 Falha na inicialização:", error);
    process.exit(1);
  }
}

// Rotas
app.get("/tasks", async (req: Request, res: Response) => {
  try {
    // 🔥 Use TaskModel (já inicializado) em vez de Task
    const tasks = await TaskModel.findAll();
    res.json(tasks);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
});

initializeApp();

export default app;
