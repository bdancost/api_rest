import { Model, ModelStatic, ModelAttributes, ModelDefined } from "sequelize";

declare module "sequelize" {
  interface ModelStatic<M extends Model = Model> {
    associate?: (models: any) => void;
  }
}

export type SequelizeModel<T extends Model = Model> = ModelStatic<T> & {
  associate?: (models: Record<string, ModelStatic>) => void;
} & typeof Model;
