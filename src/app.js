// Importa o Express
const express = require("express");
const app = express();
const taskRoutes = require("./routes/taskRoutes");

require("dotenv").config(); // Carrega variáveis de ambiente do arquivo .env

// Habilita o Express a interpretar JSON no corpo das requisições
app.use(express.json());
app.use("/tasks", taskRoutes); // Define as rotas para tarefas

// Define a porta e inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost: ${PORT}`);
});
