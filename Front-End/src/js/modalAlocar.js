// src/js/modalAlocar.js
import { fecharModais } from "./utils.js";
import { operadores, obterOperadorPorId } from "./operadores.js";
import { adicionarOperadorAEscala } from "./escalas.js"; // Novo Import

let slotEmAlocacao = { dia: null, turno: null }; // Variável para controlar qual slot da escala está sendo alocado

// ====================== MODAL ALOCAR ======================

/**
 * Preenche o dropdown do modal com a lista de operadores.
 */
function popularSelectOperadores() {
    const select = document.getElementById("select-operador");
    if (!select) return;

    select.innerHTML = '<option value="" selected>Selecione um Operador...</option>';

    operadores.forEach(op => {
        const option = document.createElement('option');
        option.value = op.id; 
        option.textContent = `${op.nome} (${op.id}) - Turno Preferencial: ${op.turnoPreferencial}`;
        select.appendChild(option);
    });
}


/**
 * Abre o modal de alocação, preenche o dropdown e exibe as informações do slot.
 * @param {string} dia O dia da semana (ex: 'Segunda').
 * @param {number} turno O número do turno (1, 2 ou 3).
 */
export function abrirModalAlocar(dia, turno) {
    // Salva o contexto do slot que está sendo alocado
    slotEmAlocacao = { dia, turno }; 
    
    popularSelectOperadores(); // Preenche o dropdown
    
    // Atualiza o cabeçalho do modal com o slot
    document.getElementById("alocar-dia").textContent = dia;
    document.getElementById("alocar-turno-info").textContent = `Turno ${turno}`;
    
    document.getElementById("modal-alocar").style.display = "flex";
}

/**
 * Salva a alocação.
 */
export function salvarAlocacao() {
    const selectOperador = document.getElementById("select-operador");
    const operadorId = selectOperador.value;

    if (!operadorId) {
        alert("Por favor, selecione um operador para alocar.");
        return;
    }
    
    if (!slotEmAlocacao.dia || !slotEmAlocacao.turno) {
        console.error("Slot de alocação não definido.");
        return;
    }
    
    // 1. Adiciona o operador à estrutura de dados da escala
    adicionarOperadorAEscala(slotEmAlocacao.dia, slotEmAlocacao.turno, operadorId);

    // 2. Limpa o estado e fecha o modal
    slotEmAlocacao = { dia: null, turno: null };
    fecharModais();
}