const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");

jest.setTimeout(10000); // 10 segundos

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Cria as tabelas
  await sequelize.models.Task.create({ title: "Tarefa de Teste" });
});

afterAll(async () => {
  await sequelize.close(); // Fecha a conexão
});

describe("GET /tasks", () => {
  it("deve retornar todas as tarefas", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].title).toBe("Tarefa de Teste");
  });
});
