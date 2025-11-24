import Alocacao from "../models/alocacao.js";


export async function criarAlocacaoService({ funcionarioId, dia, turno }) {
    
    // Regra de negócio: funcionário não pode estar em 2 turnos no mesmo dia
    const existe = await Alocacao.findOne({ funcionarioId, dia });
    if (existe) {
        throw new Error("Funcionário já está alocado em outro turno neste dia.");
    }

    return await Alocacao.create({ funcionarioId, dia, turno });
}

export async function listarAlocacoesService() {
    return await Alocacao.find().populate("funcionarioId");
}

export async function deletarAlocacaoService(id) {
    return await Alocacao.findByIdAndDelete(id);
}
