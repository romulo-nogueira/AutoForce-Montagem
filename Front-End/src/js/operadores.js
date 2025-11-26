// src/js/operadores.js
import { fecharModais } from "./utils.js"; 
// Não precisa importar Modais, pois as chamadas são feitas via window (global)

// ====================== DADOS E CRUD BÁSICO ======================

// Lista de operadores em memória (simulando um banco de dados)
export let operadores = [
    { id: "OP-001", nome: "João Silva", qualificacoes: ["Solda Robótica", "Montagem"], turnoPreferencial: 1 },
    { id: "OP-002", nome: "Maria Santos", qualificacoes: ["Inspeção Elétrica", "Controle de Qualidade"], turnoPreferencial: 2 },
];

/**
 * Carrega e renderiza a lista de operadores na tabela.
 */
export function carregarOperadores() {
    const tabela = document.getElementById("tabela-colaboradores"); 
    if (!tabela) return;

    tabela.innerHTML = "";

    operadores.forEach(op => {
        const linha = document.createElement("tr");
        
        // As funções de ação são chamadas usando os módulos exportados para o window no main.js
        linha.innerHTML = `
            <td>${op.id}</td>
            <td>${op.nome}</td>
            <td>${op.qualificacoes.join(", ")}</td>
            <td>Turno ${op.turnoPreferencial}</td>
            <td>
                <button class="btn-edit" onclick="ModalEdit.abrirModalEditar('${op.id}')">Editar</button>
                <button class="btn-delete" onclick="Operadores.deletarOperador('${op.id}')">Excluir</button>
                <button class="btn-alocar" onclick="ModalAlocar.abrirModalAlocar('${op.id}')">Alocar</button>
            </td>
        `;
        tabela.appendChild(linha);
    });
}

/**
 * Adiciona um novo operador e recarrega a tabela.
 * @param {Object} novo O objeto do novo operador.
 */
export function adicionarOperador(novo) {
    operadores.push(novo);
    carregarOperadores();
}

/**
 * Encontra e retorna um operador pelo ID.
 * @param {string} id O ID do operador.
 * @returns {Object|undefined} O objeto do operador ou undefined.
 */
export function obterOperadorPorId(id) {
    return operadores.find(o => o.id === id);
}

/**
 * Remove um operador e recarrega a tabela.
 * @param {string} id O ID do operador a ser removido.
 */
export function deletarOperador(id) {
    const confirmacao = confirm(`Tem certeza que deseja excluir o operador ${id}?`);
    if (confirmacao) {
        const index = operadores.findIndex(op => op.id === id);
        if (index > -1) {
            operadores.splice(index, 1);
            carregarOperadores();
            console.log(`Operador ${id} removido.`);
        }
    }
} 