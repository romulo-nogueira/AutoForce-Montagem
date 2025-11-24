import Funcionario from "../models/funcionario.js";

export async function criarFuncionarioService(dados) {
    return await Funcionario.create(dados);
}

export async function listarFuncionariosService(filtro) {
    return await Funcionario.find(filtro);
}

export async function atualizarFuncionarioService(id, dados) {
    return await Funcionario.findByIdAndUpdate(id, dados, { new: true });
}

export async function atualizarFuncionarioParcialService(id, dados) {
    return await Funcionario.findByIdAndUpdate(id, { $set: dados }, { new: true });
}

export async function deletarFuncionarioService(id) {
    return await Funcionario.findByIdAndDelete(id);
}
