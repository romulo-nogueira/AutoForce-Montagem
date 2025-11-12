import mongoose from "mongoose";

const banco = process.env.DB_CONNECT;

async function conectaBanco() {
    try {
        await mongoose.connect(banco);
        console.log("✅ Conectado ao banco de dados com sucesso!")
        return mongoose.connection
    } catch (error) {
        console.error("Erro ao conectar:", error);
        throw error;
    }
}
export default conectaBanco;