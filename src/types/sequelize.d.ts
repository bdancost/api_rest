import { Model, ModelStatic } from "sequelize";

declare module "sequelize" {
  interface ModelStatic<M extends Model = Model> {
    associate?: (models: Record<string, ModelStatic<Model>>) => void;
  }
}

export interface ModelWithAssociate extends Model {
  // Adicione métodos de instância se necessário
}
