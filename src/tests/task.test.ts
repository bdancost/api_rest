import request from "supertest";
import app from "../app";
import models from "../models"; // Importa tudo de uma vez
const { sequelize, Task } = models; // Destructuring

jest.setTimeout(10000);

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Agora vai funcionar
  await Task.create({
    title: "Tarefa de Teste",
    completed: false,
  });
});

afterAll(async () => {
  await sequelize.close(); // Agora vai fechar a conexão
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
