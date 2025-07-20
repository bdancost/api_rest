const { Sequelize } = require("sequelize");
require("dotenv").config();

// Configuração da conexão com PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nome do banco de dados
  process.env.DB_USER, // Usuário
  process.env.DB_PASSWORD, // Senha
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false, // Altere para true para ver logs das queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Função para testar a conexão
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com PostgreSQL estabelecida com sucesso!");

    // Sincroniza os modelos com o banco de dados (opcional)
    await sequelize.sync();
    console.log("🔁 Modelos sincronizados com o banco de dados");

    return sequelize;
  } catch (error) {
    console.error("💥 Erro ao conectar ao PostgreSQL:", error);
    process.exit(1); // Encerra a aplicação em caso de erro
  }
};

module.exports = { connectToDatabase, sequelize };
