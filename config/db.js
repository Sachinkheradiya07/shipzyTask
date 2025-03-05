import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(" Database connected successfully!");
    await sequelize.sync({ alter: true });
    console.log(" Tables created successfully!");
  } catch (error) {
    console.error(" Database connection failed:", error);
  }
}

connectDB();

export default sequelize;
