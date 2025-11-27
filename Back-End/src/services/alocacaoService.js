// src/services/alocacaoService.js
import mongoose from "mongoose";
import Alocacao from "../models/alocacao.js";

export async function criarAlocacaoService({ funcionarioId, dia, turno }) {

    // =============================
    // 1. Validar ID do funcionário
    // =============================
    if (!mongoose.Types.ObjectId.isValid(funcionarioId)) {
        throw new Error("ID de funcionário inválido");
    }

    // =============================
    // 2. Regra de negócio:
    //    funcionário não pode ter 2 turnos no mesmo dia
    // =============================
    const conflito = await Alocacao.findOne({ funcionarioId, dia });

    if (conflito) {
        throw new Error("Funcionário já está alocado em outro turno neste dia.");
    }

    // =============================
    // 3. Criar alocação
    // =============================
    return await Alocacao.create({
        funcionarioId,
        dia,
        turno: Number(turno)  // garante tipo correto
    });
}


export async function listarAlocacoesService() {
    return await Alocacao.find().populate("funcionarioId");
}

export async function deletarAlocacaoService(id) {
    return await Alocacao.findByIdAndDelete(id);
}
