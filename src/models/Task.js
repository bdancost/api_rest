const mongoose = require("mongoose");

// Define o Schema (estrutura) da tarefa
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Título obrigatório
  completed: { type: Boolean, default: false }, // Completo? (padrão: false)
  createdAt: { type: Date, default: Date.now }, // Data de criação
});

// Exporta o modelo "Task" baseado no Schema
module.exports = mongoose.model("Task", TaskSchema);
