// src/js/modalAdd.js
import { adicionarOperador } from "./operadores.js";
import { gerarId, fecharModais } from "./utils.js";

// ====================== MODAL ADICIONAR ======================

export function abrirModalAdd() {
    document.getElementById("modal-add").style.display = "flex";
}

/**
 * Captura dados do modal, cria um novo operador e salva.
 */
export function salvarNovoOperador() {
    const nomeInput = document.getElementById("add-nome");
    const qualInput = document.getElementById("add-qual");
    const turnoSelect = document.getElementById("add-turno");
    
    const nome = nomeInput.value.trim();
    const qualificacoesString = qualInput.value.trim();
    const turno = Number(turnoSelect.value);

    if (!nome) {
        alert("O campo Nome é obrigatório.");
        return;
    }

    // Processa a string de qualificações (separada por vírgula)
    const qualificacoes = qualificacoesString
        .split(',')
        .map(q => q.trim()) 
        .filter(q => q.length > 0); 

    const novo = {
        id: gerarId(),
        nome,
        qualificacoes,
        turnoPreferencial: turno
    };

    adicionarOperador(novo);
    
    // Limpa os campos e fecha o modal
    nomeInput.value = '';
    qualInput.value = '';
    turnoSelect.value = '1';

    fecharModais();
}