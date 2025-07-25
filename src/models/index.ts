/**
 * Arquivo: models/index.ts
 *
 * Configuração centralizada dos modelos Sequelize com tipagem TypeScript
 */

import { Sequelize, ModelStatic } from "sequelize";
import sequelize from "../config/database";
import Task from "../models/task";

// 1. Interface para tipagem dos modelos
interface DatabaseModels {
  Task: typeof Task;
  // Adicione outros modelos aqui conforme necessário
  // Ex: User: ModelStatic<UserModel>;
}

// 2. Interface para o objeto db completo
interface DatabaseInstance {
  sequelize: Sequelize;
  models: DatabaseModels;
}

// Objeto principal
const db = {
  sequelize,
  Task, // Exportando Task diretamente
  models: {
    Task,
  } as DatabaseModels,
};

// Objeto com todos os modelos
const models: DatabaseModels = {
  Task,
};

// Configura associações entre modelos
Object.values(models).forEach((model) => {
  if ("associate" in model) {
    model.associate(models);
  }
});

// Exportações
export default db;
export { sequelize, Task };
