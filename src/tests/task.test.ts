import request from "supertest";
import app from "../app";
import sequelize from "../models";
import Task from "../models/task"; // Importe seu modelo Task

jest.setTimeout(10000); // 10 segundos

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Cria as tabelas

  // Cria tarefa de teste com tipagem
  await Task.create({
    title: "Tarefa de Teste",
    completed: false,
  });
});

afterAll(async () => {
  await sequelize.close(); // Fecha a conexão
});

describe("GET /tasks", () => {
  it("deve retornar todas as tarefas", async () => {
    const response = await request(app)
      .get("/tasks")
      .expect("Content-Type", /json/); // Adicionado verificação de content-type

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();

    // Verificação de tipo mais seguro
    const tasks = response.body as Array<{
      id: number;
      title: string;
      completed: boolean;
      createdAt?: string;
      updatedAt?: string;
    }>;

    expect(tasks[0].title).toBe("Tarefa de Teste");
  });
});
