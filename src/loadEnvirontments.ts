import dotenv from "dotenv";

dotenv.config();

const environment = {
  port: process.env.PORT,
  mongoDbUrl: process.env.DATABASE_URL,
};

export default environment;
