// Importa o Express
const express = require("express");
const app = express();

// Habilita o Express a interpretar JSON no corpo das requisições
app.use(express.json());

// Rota GET simples para teste
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// Define a porta e inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost: ${PORT}`);
});
