import fs from "fs";
import path from "path";
import { Sequelize, DataTypes, ModelStatic, Model } from "sequelize";
import process from "process";

interface DatabaseConfig {
  use_env_variable?: string;
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
  dialect: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";
  logging: boolean | ((sql: string, timing?: number) => void);
  pool?: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
  dialectOptions?: Record<string, any>;
}

interface DbInstance {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: ModelStatic<Model> | any;
}

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config: DatabaseConfig = require(__dirname + "/../config/database.js")[
  env
];
const db: DbInstance = {} as DbInstance;

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable] as string,
    config
  );
} else {
  sequelize = new Sequelize({
    database: config.database,
    username: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    pool: config.pool,
    dialectOptions: config.dialectOptions,
  });
}

// Carregar modelos dinamicamente
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".ts" && // Alterado para .ts
      file.indexOf(".test.ts") === -1
    );
  })
  .forEach((file) => {
    const modelPath = path.join(__dirname, file);
    const model: ModelStatic<Model> = require(modelPath).default(
      sequelize,
      DataTypes
    );
    db[model.name] = model;
  });

// Configurar associações
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
