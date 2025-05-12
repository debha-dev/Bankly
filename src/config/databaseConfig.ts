import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = process.env.DB_CONFIG || "dev";
let databaseUrl: string | undefined;

if (dbConfig === "dev") {
  databaseUrl = process.env.DB_URL_DEV;
} else if (dbConfig === "prod") {
  databaseUrl = process.env.DB_URL_PROD;
}

if (!databaseUrl) {
  throw new Error("Database URL not provided, please provide a valid URL in your .env file.");
}

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST, 
  port: Number(process.env.DB_PORT) || 5432, 
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,    
  password: process.env.DB_PASSWORD,  
  
  dialectOptions: isProduction && process.env.DB_CA_CERTIFICATE ? {
    ssl: {
      require: true,
      rejectUnauthorized: true,
      ca: process.env.DB_CA_CERTIFICATE,
    },
  } : {},
  logging: false,
});

const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL database successfully with Sequelize");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export { sequelize, connectDB };