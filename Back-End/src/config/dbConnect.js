import mongoose from "mongoose";

const banco = process.env.DB_CONNECT;

async function conectaBanco() {
    try {

        if (!banco) {
            throw new Error("❌ Variável DB_CONNECT não encontrada no .env");
        }

        await mongoose.connect(banco, {
            autoIndex: true
        });

        console.log("✅ Conectado ao banco de dados com sucesso!");
        return mongoose.connection;

    } catch (error) {
        console.error("❌ Erro ao conectar no banco:", error.message);
        throw error;
    }
}

export default conectaBanco;