/**
 * Arquivo: config/database.ts
 *
 * Responsabilidade:
 * - Configura e gerencia a conexão com o banco de dados PostgreSQL
 * - Implementa mecanismos de pool de conexões
 * - Fornece função de teste de conexão
 * - Sincroniza modelos com o banco (opcional)
 */

// Importa o Sequelize
const { Sequelize } = require("sequelize");
// Carrega variáveis de ambiente do arquivo .env
require("dotenv").config();

/**
 * Configuração da conexão com PostgreSQL
 *
 * Parâmetros:
 * - DB_NAME: Nome do banco de dados (variável de ambiente)
 * - DB_USER: Usuário do banco (variável de ambiente)
 * - DB_PASSWORD: Senha do banco (variável de ambiente)
 *
 * Opções:
 * - host: Endereço do servidor PostgreSQL
 * - port: Porta de conexão
 * - dialect: Tipo de banco de dados (postgres)
 * - logging: false para desativar logs de queries (recomendado para produção)
 * - pool: Configuração do pool de conexões
 */
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nome do banco (from .env)
  process.env.DB_USER, // Usuário (from .env)
  process.env.DB_PASSWORD, // Senha (from .env)
  {
    host: process.env.DB_HOST, // Endereço do servidor
    port: process.env.DB_PORT, // Porta (padrão PostgreSQL: 5432)
    dialect: "postgres", // Dialeto para PostgreSQL
    logging: false, // Desativa logs de SQL (performance)

    // Configuração do pool de conexões
    pool: {
      max: 5, // Máximo de conexões no pool
      min: 0, // Mínimo de conexões no pool
      acquire: 30000, // Tempo máximo (ms) para adquirir conexão
      idle: 10000, // Tempo máximo (ms) que conexão pode ficar idle
    },
  }
);

/**
 * Função de teste de conexão com o banco de dados
 *
 * Funcionalidades:
 * 1. Autentica credenciais com o banco
 * 2. Sincroniza modelos (opcional)
 * 3. Retorna a instância do Sequelize
 *
 * @throws {Error} Se a conexão falhar
 * @returns {Promise<Sequelize>} Instância configurada do Sequelize
 */
const connectToDatabase = async () => {
  try {
    // 1. Testa a conexão
    await sequelize.authenticate();
    console.log("✅ Conexão com PostgreSQL estabelecida com sucesso!");

    /**
     * 2. Sincroniza modelos (operação destrutiva em produção!)
     * Observação: Em produção, prefira usar migrations
     */
    await sequelize.sync();
    console.log("🔁 Modelos sincronizados com o banco de dados");

    return sequelize;
  } catch (error) {
    console.error("💥 Erro ao conectar ao PostgreSQL:", error);
    process.exit(1); // Encerra a aplicação com erro
  }
};

// Exporta recursos para uso na aplicação
module.exports = {
  connectToDatabase, // Função de conexão testável
  sequelize, // Instância configurada do Sequelize
};
