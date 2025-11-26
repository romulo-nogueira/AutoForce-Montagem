// src/js/modalEdit.js
import { obterOperadorPorId, carregarOperadores } from "./operadores.js";
import { fecharModais } from "./utils.js";

let operadorEmEdicao = null;

// ====================== MODAL EDITAR ======================

/**
 * Abre o modal de edição e preenche os campos com os dados do operador.
 * @param {string} id O ID do operador a ser editado.
 */
export function abrirModalEditar(id) {
    const operador = obterOperadorPorId(id);
    if (!operador) {
        alert("Operador não encontrado para edição.");
        return;
    }

    operadorEmEdicao = operador;

    // Preenche os campos do modal com os dados atuais
    document.getElementById("edit-nome").value = operador.nome;
    document.getElementById("edit-qual").value = operador.qualificacoes.join(', ');
    document.getElementById("edit-turno").value = operador.turnoPreferencial.toString();
    
    document.getElementById("modal-edit").style.display = "flex";
}

/**
 * Salva as alterações feitas no modal de edição.
 */
export function salvarEdicao() {
    if (!operadorEmEdicao) return;

    const nome = document.getElementById("edit-nome").value.trim();
    const qualificacoesString = document.getElementById("edit-qual").value.trim();
    const turno = Number(document.getElementById("edit-turno").value);

    if (!nome) {
        alert("O campo Nome é obrigatório.");
        return;
    }
    
    // Processa a string de qualificações
    const qualificacoes = qualificacoesString
        .split(',')
        .map(q => q.trim())
        .filter(q => q.length > 0);

    // Atualiza o objeto do operador em memória
    operadorEmEdicao.nome = nome;
    operadorEmEdicao.qualificacoes = qualificacoes;
    operadorEmEdicao.turnoPreferencial = turno;

    // Recarrega a tabela e limpa o estado
    carregarOperadores(); 
    operadorEmEdicao = null;
    fecharModais();
}