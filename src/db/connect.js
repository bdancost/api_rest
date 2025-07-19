const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  // Usa a variável de ambiente
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => console.log("Conectado ao MongoDB!"));
mongoose.connection.on("error", (err) => console.log("Erro na conexão:", err));
