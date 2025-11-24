import mongoose from "mongoose";

const funcionarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    qualificacoes: { type: [String], required: true }
});

export default mongoose.model("Funcionario", funcionarioSchema);
