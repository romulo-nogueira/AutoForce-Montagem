import mongoose from "mongoose";

const alocacaoSchema = new mongoose.Schema({
    funcionarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Funcionario", required: true },
    dia: { type: String, required: true }, // formato "2025-11-23"
    turno: { type: String, required: true } // "manha", "tarde", "noite"
});

export default mongoose.model("Alocacao", alocacaoSchema);
