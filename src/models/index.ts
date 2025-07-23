import sequelize from "../config/database";
import Task from "./task";

const models = {
  Task: Task,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
export default models;
