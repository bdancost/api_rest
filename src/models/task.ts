import {
  Model,
  DataTypes,
  ModelAttributes,
  InitOptions,
  Sequelize,
} from "sequelize";

interface TaskAttributes {
  id?: number;
  title: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

class Task extends Model<TaskAttributes> implements TaskAttributes {
  declare id: number;
  declare title: string;
  declare completed: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static associate(models: any): void {
    // Associações aqui
  }

  // Método estático para inicialização
  static initialize(sequelize: Sequelize): typeof Task {
    const taskSchema: ModelAttributes<Task, TaskAttributes> = {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    };

    const initOptions: InitOptions<Task> = {
      sequelize, // Recebida como parâmetro
      modelName: "Task",
      tableName: "tasks",
      timestamps: true,
    };

    Task.init(taskSchema, initOptions);
    return Task;
  }
}

export default Task;
export type { TaskAttributes };
