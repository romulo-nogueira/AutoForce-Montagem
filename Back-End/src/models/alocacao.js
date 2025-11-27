import mongoose from "mongoose";

const alocacaoSchema = new mongoose.Schema({
    funcionarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Funcionario",
        required: true
    },
    dia: {
        type: String,
        required: true
    },
    turno: {
        type: Number,   // <-- CORRETO!
        required: true
    }
});

export default mongoose.model("Alocacao", alocacaoSchema);
