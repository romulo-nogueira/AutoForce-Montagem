import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import conectaBanco from "./config/dbConnect.js";

const app = express();

// Configurar CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));


app.use(express.json());

// Ativa rotas
routes(app);

// Função para iniciar o servidor após conectar ao banco
async function startServer() {
  try {
    await conectaBanco();
    console.log("📦 Banco conectado com sucesso!");

    // Render fornece a porta via process.env.PORT
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () =>
      console.log(`🚀 Servidor rodando em: ${PORT}`)
    );

  } catch (err) {
    console.error("❌ Erro ao iniciar servidor:", err);
  }
}

startServer();