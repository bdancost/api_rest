require("dotenv").config();
const express = require("express");
const { sequelize } = require("./config/database"); // Importa do novo arquivo de configuração
const Task = require("./models/Task"); // Importa seu modelo

const app = express();
app.use(express.json());

// Conexão com o banco e inicialização do servidor
async function initializeApp() {
  try {
    // Testa a conexão e sincroniza os modelos
    await sequelize.authenticate();
    await sequelize.sync(); // Sincroniza modelos com o banco (opcional)
    console.log("✅ Banco de dados conectado e sincronizado!");

    // Inicia o servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("💥 Falha na inicialização:", error);
    process.exit(1); // Encerra o processo com erro
  }
}

// Rotas
app.get("/", (req, res) => {
  res.send("🔥 TÁ FUNFANDO!");
});

// Rota de exemplo usando o modelo Task
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicializa a aplicação
initializeApp();

module.exports = app; // Exporta para testes
