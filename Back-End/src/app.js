import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import conectaBanco from "./config/dbConnect.js";

const app = express();

// Configurar CORS
// Para produção, troque "*" pelo domínio do seu frontend, ex: "https://meu-frontend.vercel.app"
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

// Habilitar JSON no body das requisições
app.use(express.json());

// Ativar rotas
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