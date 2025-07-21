declare namespace NodeJS {
  interface ProcessEnv {
    // Banco de dados
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT?: string;
    DB_NAME_TEST: string;

    // Configurações do Sequelize
    DB_DIALECT: "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql";
    DB_LOGGING?: string;
    DB_POOL_MAX?: string;
    DB_POOL_MIN?: string;
    DB_POOL_ACQUIRE?: string;
    DB_POOL_IDLE?: string;

    // Produção
    DATABASE_URL?: string;
  }
}
