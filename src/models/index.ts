/**
 * Arquivo: models/index.ts
 *
 * Responsabilidade:
 * - Centraliza a configuração dos modelos do Sequelize
 * - Gerencia as associações entre modelos
 * - Exporta os recursos do banco de dados para a aplicação
 */

// Importa a instância configurada do Sequelize
import sequelize from "../config/database";

// Importa o modelo Task definido em models/task
import Task from "../models/task";

/**
 * Objeto que agrupa todos os modelos da aplicação.
 *
 * Propósito:
 * - Facilita o gerenciamento centralizado de modelos
 * - Permite estabelecer relações entre modelos
 */
const models = {
  Task, // Modelo de tarefas (Tasks)
  // Outros modelos podem ser adicionados aqui conforme a aplicação cresce
};

/**
 * Configura as associações entre modelos.
 *
 * Funcionamento:
 * - Itera sobre todos os modelos registrados
 * - Verifica se cada modelo possui um método 'associate'
 * - Se existir, executa o método passando todos os modelos como contexto
 *
 * Isso permite que os modelos definam suas relações de forma declarativa
 */
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models); // Configura relações do modelo com outros modelos
  }
});

/**
 * Exportações:
 *
 * 1. sequelize - Instância configurada do Sequelize
 *    - Uso: Para operações diretas com o banco de dados
 *    - Exemplo: Transações, queries brutas, gerenciamento de conexão
 *
 * 2. Task - Modelo de tarefas
 *    - Uso: Para operações CRUD específicas de tarefas
 *    - Exemplo: Task.findAll(), Task.create(), etc.
 */
export { sequelize }; // Exportação nomeada da instância do Sequelize
export { Task }; // Exportação nomeada do modelo Task

/**
 * Boas práticas implementadas:
 *
 * 1. Centralização de modelos: Facilita a manutenção e escalabilidade
 * 2. Configuração automática de associações: Simplifica a definição de relações
 * 3. Exportações explícitas: Melhora a legibilidade e o auto-complete em IDEs
 * 4. Preparação para crescimento: Estrutura pronta para adicionar novos modelos
 */
