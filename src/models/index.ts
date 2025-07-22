import fs from "fs";
import path from "path";
import { Sequelize, DataTypes, ModelStatic, Model } from "sequelize";
import process from "process";

// 1. Interface para modelos com `associate`
interface ModelWithAssociate extends Model {
  associate?: (models: Record<string, ModelStatic<Model>>) => void;
}

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/database")[env]; // CommonJS

// 2. Inicialização segura do Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    pool: config.pool,
    dialectOptions: config.dialectOptions,
  }
);

// 3. Carregamento dinâmico dos modelos
const db: Record<string, ModelStatic<ModelWithAssociate>> = {};

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".ts" &&
      file.indexOf(".test.ts") === -1
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      DataTypes
    );
    db[model.name] = model;
  });

// 4. Associações (com verificação de tipo)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export { sequelize, Sequelize };
export default sequelize;
