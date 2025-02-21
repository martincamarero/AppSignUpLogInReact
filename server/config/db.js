import { connect } from "mongoose";
import dotenv from "dotenv"; // Importa dotenv
import process from "process";

// Llamamos a dotenv.config() para cargar las variables de entorno
dotenv.config();

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI); // Usa process.env para acceder a las variables de entorno
        console.log("✅ MongoDB conectado");
    } catch (error) {
        console.error("❌ Error al conectar MongoDB:", error);
        process.exit(1); // Terminamos el proceso si hay error
    }
};

export default connectDB;
