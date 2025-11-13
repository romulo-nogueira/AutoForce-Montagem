import "dotenv/config";
import express from 'express';
import cors from 'cors';
import routes from "./routes";
import conectaBanco from "./config/dbConnect.js";

const app = express();
app.use(cors());
app.use(express.json()); 
routes(app);

//Conecta Banco

const porta = process.env.PORTA;
const end = process.env.END;
app.listen(porta, () => console.log(`🚀 Endereço: ${end}:${porta}`));
