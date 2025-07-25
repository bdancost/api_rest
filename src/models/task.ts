/**
 * Arquivo: models/task.ts
 *
 * Responsabilidade:
 * - Define a estrutura da entidade Task no banco de dados
 * - Configura os atributos, tipos e constraints da tabela
 * - Implementa a interface TypeScript para tipagem estática
 */

// Importações necessárias do Sequelize
import { DataTypes, Model, ModelStatic } from "sequelize";
import sequelize from "../config/database";

/**
 * Interface TypeScript para os atributos da Task
 *
 * Propósito:
 * - Definir a tipagem estática para o modelo
 * - Garantir type-safety nas operações com tasks
 */
interface TaskAttributes {
  id?: number; // Opcional (gerado automaticamente)
  title: string; // Obrigatório
  completed?: boolean; // Opcional (default: false)
}

/**
 * Classe Task que estende Model do Sequelize
 *
 * Características:
 * - Implementa TaskAttributes para garantir conformidade com a interface
 * - Declara os tipos das colunas e timestamps
 */
class Task extends Model<TaskAttributes> implements TaskAttributes {
  // Colunas da tabela (declaração explícita para TypeScript)
  public id!: number; // ID automático
  public title!: string; // Título da tarefa (não-nulo)
  public completed!: boolean; // Status de completude

  // Timestamps automáticos do Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * Método estático para associações
   *
   * Uso:
   * - Define relações com outros modelos (ex: Task.belongsTo(User))
   * - Chamado automaticamente em models/index.ts
   */
  static associate: (models: Record<string, ModelStatic<Model>>) => void;
}

/**
 * Inicialização do modelo Task
 *
 * Configura:
 * 1. Estrutura da tabela no banco de dados
 * 2. Opções de nomenclatura
 * 3. Conexão com o Sequelize
 */
Task.init(
  {
    // Definição das colunas
    id: {
      type: DataTypes.INTEGER, // Tipo INTEGER
      autoIncrement: true, // Auto-incremento
      primaryKey: true, // Chave primária
    },
    title: {
      type: DataTypes.STRING, // Tipo STRING (VARCHAR)
      allowNull: false, // NOT NULL constraint
    },
    completed: {
      type: DataTypes.BOOLEAN, // Tipo BOOLEAN
      defaultValue: false, // Valor padrão: false
    },
  },
  {
    // Configurações gerais
    sequelize, // Instância do Sequelize
    modelName: "Task", // Nome do modelo (uso interno)
    tableName: "tasks", // Nome da tabela no banco
  }
);

// Exporta o modelo para uso em outras partes da aplicação
export default Task;
