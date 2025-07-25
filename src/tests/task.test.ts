import request from "supertest";
import app from "../app";
import db from "../models"; // Importa o objeto db

// Destructuring com a nova estrutura
const { sequelize, Task } = db;

jest.setTimeout(10000);

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Task.create({
    title: "Tarefa de Teste",
    completed: false,
  });
});

afterAll(async () => {
  await sequelize.close(); // Fecha a conexão com o banco
  await new Promise((resolve) => setTimeout(resolve, 500)); // Aguarda finalização
});

describe("GET /tasks", () => {
  it("deve retornar todas as tarefas", async () => {
    const response = await request(app)
      .get("/tasks")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toMatchObject({
      title: "Tarefa de Teste",
      completed: false,
    });
  });
});
