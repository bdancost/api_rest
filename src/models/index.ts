import fs from "fs";
import path from "path";
import { Sequelize, DataTypes, ModelStatic, Model, Dialect } from "sequelize";
import process from "process";

// ======================================
// 1. INTERFACES (TYPES)
// ======================================
interface BaseDatabaseConfig {
  port: number;
  dialect: Dialect;
  logging?: boolean | ((sql: string, timing?: number) => void); // Opcional
  pool?: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
  dialectOptions?: Record<string, any>;
}

interface StandardDatabaseConfig extends BaseDatabaseConfig {
  database: string;
  username: string;
  password: string;
  host: string;
}

interface EnvDatabaseConfig extends BaseDatabaseConfig {
  use_env_variable: string;
}

type DatabaseConfig = StandardDatabaseConfig | EnvDatabaseConfig;

// Interface estendida para incluir o método associate
interface ModelStaticWithAssociate<T extends Model> extends ModelStatic<T> {
  associate?: (models: Record<string, ModelStatic<Model>>) => void;
}

// ======================================
// 2. CARREGA CONFIGURAÇÃO (COMMONJS)
// ======================================
const env = process.env.NODE_ENV || "development";
const rawConfig = require("../config/database"); // CommonJS
const config: DatabaseConfig = rawConfig[env];

if (!config) {
  throw new Error(`❌ Configuração para o ambiente "${env}" não encontrada!`);
}

// ======================================
// 3. INICIALIZA SEQUELIZE
// ======================================
const sequelize =
  "use_env_variable" in config
    ? new Sequelize(process.env[config.use_env_variable] as string, config)
    : new Sequelize({
        database: config.database,
        username: config.username,
        password: config.password,
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        logging: config.logging ?? false, // Fallback para false se undefined
        pool: config.pool,
        dialectOptions: config.dialectOptions,
      });

// ======================================
// 4. CARREGA MODELOS DINAMICAMENTE
// ======================================
// Atualize o tipo do objeto db
const db: Record<string, ModelStaticWithAssociate<Model>> = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".ts" &&
      file.indexOf(".test.ts") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      DataTypes
    );
    db[model.name] = model;
  });

// ======================================
// 5. CONFIGURA ASSOCIAÇÕES
// ======================================
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// ======================================
// 6. EXPORTAÇÕES (COMMONJS)
// ======================================
export { sequelize, Sequelize };
export default sequelize;
