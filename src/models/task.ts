import { DataTypes, Model, ModelStatic } from "sequelize";
import sequelize from "../config/database";

interface TaskAttributes {
  id?: number;
  title: string;
  completed?: boolean;
}

class Task extends Model<TaskAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public completed!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate: (models: Record<string, ModelStatic<Model>>) => void;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
  }
);

export default Task;
