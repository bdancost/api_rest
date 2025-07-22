import { Sequelize, DataTypes, Model } from "sequelize";

interface TaskAttributes {
  id?: number;
  title: string;
  completed: boolean;
}

interface TaskInstance extends Model<TaskAttributes>, TaskAttributes {}

// Tipo simplificado e corrigido
type TaskModelStatic = typeof Model & {
  new (values?: object, options?: object): TaskInstance;
  associate?: (models: any) => void;
};

const Task = (sequelize: Sequelize): TaskModelStatic => {
  const TaskModel = sequelize.define<TaskInstance>("Task", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }) as TaskModelStatic;

  TaskModel.associate = (models) => {
    // Associações aqui
  };

  return TaskModel;
};

export default Task;
