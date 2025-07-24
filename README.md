# 📝 Todo API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js) ![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?logo=typescript) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-blue?logo=postgresql) ![Sequelize](https://img.shields.io/badge/Sequelize-6.x-lightblue?logo=sequelize) ![Express](https://img.shields.io/badge/Express-5.x-black?logo=express)

API RESTful para gerenciamento de tarefas (ToDo), construída com **Node.js**, **TypeScript**, **Express** e **Sequelize** usando **PostgreSQL**.

---

## 🚀 Funcionalidades

- 📋 CRUD de tarefas (Create, Read, Update, Delete)
- ✅ Validação de dados
- 🗄️ Migrations e seeders com Sequelize CLI
- 🧪 Testes automatizados com Jest e Supertest
- 🔒 Pronto para autenticação JWT (estrutura inicial)

---

## 📦 Estrutura do Projeto

```
src/
  app.ts              # Inicialização do servidor Express
  config/
    database.ts       # Configuração do Sequelize
  controllers/        # Lógica das rotas (Task, Auth)
  db/                 # Conexão bruta (JS)
  middleware/         # Middlewares de validação
  models/             # Modelos Sequelize (Task)
  routes/             # Rotas Express
  tests/              # Testes automatizados
  types/              # Tipagens customizadas
migrations/           # Migrations do banco
seeders/              # Seeders do banco
.env                  # Variáveis de ambiente
```

---

## ⚙️ Instalação

1. **Clone o repositório**

   ```sh
   git clone https://github.com/bdancost/api_rest.git
   cd todo-api
   ```

2. **Instale as dependências**

   ```sh
   npm install
   ```

3. **Configure o banco de dados**

   - Crie um banco PostgreSQL (ex: `todo_api`)
   - Configure o arquivo `.env`:
     ```
     DB_NAME=todo_api
     DB_USER=seu_usuario
     DB_PASSWORD=sua_senha
     DB_HOST=localhost
     PORT=3000
     ```

4. **Rode as migrations**

   ```sh
   npm run migrate
   ```

---

## 🏃‍♂️ Como rodar

- **Modo desenvolvimento** (com hot reload):

  ```sh
  npm run dev
  ```

- **Build e produção**:
  ```sh
  npm run build
  npm start
  ```

---

## 🧪 Testes

Execute todos os testes automatizados:

```sh
npm test
```

---

## 📚 Exemplos de uso da API

### 🔹 Listar tarefas

`GET /tasks`

```json
[
  {
    "id": 1,
    "title": "Tarefa de Teste",
    "completed": false,
    "createdAt": "2024-07-20T00:00:00.000Z",
    "updatedAt": "2024-07-20T00:00:00.000Z"
  }
]
```

### 🔹 Criar tarefa

`POST /tasks`

```json
{
  "title": "Nova tarefa",
  "completed": false
}
```

### 🔹 Atualizar tarefa

`PUT /tasks/1`

```json
{
  "title": "Tarefa atualizada",
  "completed": true
}
```

### 🔹 Deletar tarefa

`DELETE /tasks/1`

---

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/) + [Supertest](https://github.com/ladjs/supertest)

---
