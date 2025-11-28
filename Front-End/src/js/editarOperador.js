import { operadores, obterOperadorPorId, carregarOperadores } from "./operadores.js";

let operandoEdicao = null;

export function abrirModalEditar(id) {
    const operador = obterOperadorPorId(id);
    operandoEdicao = operador;

    document.getElementById("edit-nome").value = operador.nome;
    document.getElementById("edit-turno").value = operador.turnoPreferencial;

    document.getElementById("modal-edit").style.display = "flex";
}

export function salvarEdicaoOperador() {
    if (!operandoEdicao) return;

    operandoEdicao.nome = document.getElementById("edit-nome").value;
    operandoEdicao.turnoPreferencial = Number(document.getElementById("edit-turno").value);

    carregarOperadores();
    fecharModalEdit();
}

export function fecharModalEdit() {
    document.getElementById("modal-edit").style.display = "none";
    operandoEdicao = null;
}
