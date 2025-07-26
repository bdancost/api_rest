import request from "supertest";
import app from "../app";
import { sequelize, Task } from "../models";

// Configuração básica do teste
beforeAll(async () => {
  await sequelize.authenticate(); // Só testa a conexão
  await Task.create({ title: "Tarefa Teste", completed: false }); // Cria direto
});

afterAll(async () => {
  await sequelize.close(); // Fecha a conexão
});

describe("GET /tasks", () => {
  it("deve retornar tarefas", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
