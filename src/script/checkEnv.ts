import dotenv from "dotenv";
import fs from "fs";

// Verifica se o arquivo .env existe
if (!fs.existsSync(".env")) {
  console.error("❌ Arquivo .env não encontrado");
  process.exit(1);
}

dotenv.config();

const requiredEnvVars = [
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_HOST",
  "DB_DIALECT",
  "DB_NAME_TEST",
];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`❌ Variáveis de ambiente ausentes: ${missingVars.join(", ")}`);
  process.exit(1);
}

console.log("✅ Todas as variáveis de ambiente necessárias estão definidas");
process.exit(0);
