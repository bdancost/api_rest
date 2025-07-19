const request = require("supertest");
const app = require("../app"); // Importa o app Express
const Task = require("../models/Task");

describe("GET /tasks", () => {
  beforeAll(async () => {
    // Antes dos testes, insere uma tarefa de teste no banco
    await Task.create({ title: "Tarefa de Teste" });
  });

  afterAll(async () => {
    // Após os testes, limpa o banco
    await Task.deleteMany();
  });

  it("deve retornar todas as tarefas", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].title).toBe("Tarefa de Teste");
  });
});
