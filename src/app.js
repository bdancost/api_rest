require("dotenv").config();
const express = require("express");
const { Sequelize } = require("sequelize");

// Configuração à prova de falhas
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

// Teste de conexão PESADO
sequelize
  .authenticate()
  .then(() => console.log("✅ Conexão com PostgreSQL ESTÁVEL!"))
  .catch((err) => console.error("💥 ERRO NO BANCO:", err));

const app = express();
app.use(express.json());

// Rota SIMPLES para teste
app.get("/", (req, res) => {
  res.send("🔥 TÁ FUNFANDO!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor detonando na porta ${PORT}`);
});
