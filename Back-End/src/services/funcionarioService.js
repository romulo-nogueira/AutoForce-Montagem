import mongoose from "mongoose";
import Funcionario from "../models/funcionario.js";

// turnoPreferencial
function validarTurno(turno) {
    if (turno === undefined) return;

    const valido = [1, 2, 3];
    if (!valido.includes(Number(turno))) {
        throw new Error("turnoPreferencial inválido. Use 1, 2 ou 3.");
    }
}

function validarId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("ID inválido.");
    }
}


// CRIAR FUNCIONÁRIO

export async function criarFuncionarioService(dados) {

    validarTurno(dados.turnoPreferencial);

    // --- GERAR MATRÍCULA SEQUENCIAL SEGURA ---
    const ultimo = await Funcionario.findOne().sort({ matricula: -1 });
    
    let novaMatricula;
    if (ultimo && typeof ultimo.matricula === "number" && !isNaN(ultimo.matricula)) {
        novaMatricula = ultimo.matricula + 1;
    } else {
        novaMatricula = 1;
    }
    // -----------------------------------------

    return await Funcionario.create({
        nome: dados.nome,
        qualificacoes: dados.qualificacoes,
        turnoPreferencial: dados.turnoPreferencial,
        matricula: novaMatricula
    });
}

// LISTAR FUNCIONÁRIOS
export async function listarFuncionariosService(filtro) {
    return await Funcionario.find(filtro);
}

/* // ATUALIZAR FUNCIONÁRIO (PUT)
export async function atualizarFuncionarioService(id, dados) {
    validarId(id);
    validarTurno(dados.turnoPreferencial);

    const atualizado = await Funcionario.findByIdAndUpdate(
        id,
        {
            nome: dados.nome,
            qualificacoes: dados.qualificacoes,
            turnoPreferencial: dados.turnoPreferencial
        },
        { new: true }
    );

    if (!atualizado) throw new Error("Funcionário não encontrado.");
    return atualizado;
} */

// ATUALIZAR FUNCIONÁRIO PARCIAL (PATCH)

export async function atualizarFuncionarioParcialService(id, dados) {
    validarId(id);
    validarTurno(dados.turnoPreferencial);

    const atualizado = await Funcionario.findByIdAndUpdate(
        id,
        { $set: dados },
        { new: true }
    );

    if (!atualizado) throw new Error("Funcionário não encontrado.");
    return atualizado;
}

// DELETA FUNCIONÁRIO

export async function deletarFuncionarioService(id) {
    validarId(id);

    const deletado = await Funcionario.findByIdAndDelete(id);
    if (!deletado) throw new Error("Funcionário não encontrado.");

    return deletado;
}
