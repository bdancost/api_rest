// Importa o framework Express para criação do servidor web
import express from "express";
// Importa a instância do Sequelize configurada para conexão com o banco de dados
import sequelize from "./models";
// Importa as rotas relacionadas às tarefas (tasks)
import taskRoutes from "./routes/taskRoutes";
import db from "./models"; // Importa o objeto db que contém os modelos e a instância do Sequelize

// Cria uma instância do aplicativo Express
const app = express();

// Middleware para parsear requisições com corpo no formato JSON
// Isso permite que o Express entenda automaticamente dados JSON enviados nas requisições
app.use(express.json());

// Configuração das rotas
// Todas as rotas definidas em taskRoutes serão acessíveis com o prefixo '/tasks'
// Exemplo: /tasks/create, /tasks/list, etc.
app.use("/tasks", taskRoutes);

// Testar conexão com o banco de dados
// O método authenticate() verifica se a conexão com o BD foi estabelecida com sucesso
sequelize;
db.sequelize
  .authenticate()
  .then(() => console.log("Database connected")) // Sucesso na conexão
  .catch((err: Error) => console.error("Database connection error:", err)); // Erro na conexão

// Sincronizar modelos com o banco de dados
// O sync() cria as tabelas no banco de acordo com os modelos definidos
// { alter: true } faz com que o Sequelize altere as tabelas existentes para corresponder aos modelos
sequelize;
db.sequelize
  .sync({ force: true })
  .then(() => console.log("Models synchronized")) // Sincronização bem-sucedida
  .catch((err: Error) => console.error("Model sync error:", err)); // Erro na sincronização

// Define a porta do servidor
// Usa a porta definida na variável de ambiente PORT ou 3000 como fallback
const PORT = process.env.PORT || 3000;

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Exporta a instância do app para possível uso em outros módulos (como testes)
export default app;
