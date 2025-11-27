import mongoose from "mongoose";

const funcionarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  qualificacoes: { type: [String], required: true },
  turnoPreferencial: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
  },
  matricula: { type: Number, unique: true }, // <-- ADICIONE ISSO
});

export default mongoose.model("Funcionario", funcionarioSchema);
