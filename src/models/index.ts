import sequelize from "../config/database";
import Task from "../models/task";

const models = {
  Task,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize }; // Named export
export { Task }; // Named export
