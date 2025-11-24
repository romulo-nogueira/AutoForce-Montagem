import "dotenv/config";
import app from "./app.js";

const porta = process.env.PORTA || 3000;
const end = process.env.END || "http://localhost";

app.listen(porta, () => {
    console.log(`🚀 Servidor rodando em: ${end}:${porta}`);
});
