import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import conectaBanco from "./config/dbConnect.js";

const app = express();

app.use(cors());
app.use(express.json());

routes(app);  // rotas ativadas

// Conectar ao banco e só então subir servidor
async function startServer() {
  try {
    await conectaBanco();
    console.log("📦 Banco conectado!");

    const porta = process.env.PORTA;
    const end = process.env.END;

    app.listen(porta, () =>
      console.log(`🚀 Servidor rodando em: ${end}:${porta}`)
    );

  } catch (err) {
    console.error("Erro ao iniciar servidor:", err);
  }
}

startServer();
