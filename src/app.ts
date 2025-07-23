import express from "express";
import { sequelize } from "./models";
import taskRoutes from "./routes/taskRoutes";

const app = express();
app.use(express.json());

// Rotas
app.use("/tasks", taskRoutes);

// Testar conexão com o banco
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Sincronizar modelos
sequelize
  .sync({ alter: true })
  .then(() => console.log("Models synchronized"))
  .catch((err) => console.error("Model sync error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
