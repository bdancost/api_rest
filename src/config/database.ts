import dotenv from "dotenv";
import { Dialect, Options } from "sequelize";

dotenv.config();

// Validação básica das variáveis obrigatórias
const requiredEnvVars = [
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_HOST",
  "DB_DIALECT",
];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Variável de ambiente ${envVar} não definida`);
  }
}

interface DatabaseConfig {
  development: Options;
  test: Options;
  production: Options;
}

const config: DatabaseConfig = {
  development: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT || "5432"),
    dialect: (process.env.DB_DIALECT as Dialect) || "postgres",
    logging: process.env.DB_LOGGING === "true",
    pool: {
      max: parseInt(process.env.DB_POOL_MAX || "5"),
      min: parseInt(process.env.DB_POOL_MIN || "0"),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE || "30000"),
      idle: parseInt(process.env.DB_POOL_IDLE || "10000"),
    },
  },
  test: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME_TEST as string,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT || "5432"),
    dialect: (process.env.DB_DIALECT as Dialect) || "postgres",
    logging: false,
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: (process.env.DB_DIALECT as Dialect) || "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

export default config;
