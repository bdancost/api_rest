import { Dialect } from "sequelize";

interface BaseConfig {
  port: number;
  dialect: Dialect;
  logging?: boolean | ((sql: string, timing?: number) => void);
  pool?: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
  dialectOptions?: Record<string, any>;
}

interface StandardConfig extends BaseConfig {
  database: string;
  username: string;
  password: string;
  host: string;
}

interface EnvConfig extends BaseConfig {
  use_env_variable: string;
}

type DatabaseConfig = {
  [key: string]: StandardConfig | EnvConfig;
};

const config: DatabaseConfig = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "todo_api",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    dialect: "postgres",
    logging: process.env.DB_LOGGING === "true",
  },

  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    port: parseInt(process.env.DB_PORT || "5432"),
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

export default config;
