// src/js/estatisticas.js
import { operadores } from "./operadores.js";

// ====================== ESTATÍSTICAS DE COLABORADORES ======================

/**
 * Calcula e renderiza os cards de estatísticas da seção Colaboradores.
 */
export function carregarEstatisticasColaboradores() {
    const cardsDiv = document.getElementById("cards-colaboradores");
    if (!cardsDiv) return;

    // 1. Total de Operadores
    const totalOperadores = operadores.length;

    // 2. Qualificações Únicas
    const todasQualificacoes = operadores.flatMap(op => op.qualificacoes);
    const qualificacoesUnicas = new Set(todasQualificacoes).size;

    // 3. Média de Qualificações por Operador
    const totalQualificacoes = todasQualificacoes.length;
    const mediaQualificacoes = totalOperadores > 0 ? (totalQualificacoes / totalOperadores).toFixed(1) : '0.0';

    // Monta o HTML dos cards (seguindo o layout da imagem)
    cardsDiv.innerHTML = `
        <div id="card-total-operadores">
            <strong>${totalOperadores}</strong>
            <h3>Total de Operadores</h3>
        </div>
        <div id="card-qualificacoes-unicas">
            <strong>${qualificacoesUnicas}</strong>
            <h3>Qualificações Únicas</h3>
        </div>
        <div id="card-media-qualificacoes">
            <strong>${mediaQualificacoes}</strong>
            <h3>Média Qualificações/Op.</h3>
        </div>
    `;

    // Aplica as cores de fundo conforme a imagem (via CSS: #cards-colaboradores > div:nth-child...)
}

// ====================== ESTATÍSTICAS DE ESCALA ======================

/**
 * Atualiza os cards de estatísticas da seção Escala Semanal.
 * @param {Object} escala A estrutura de dados da escala semanal.
 */
export function atualizarEstatisticasEscala(escala) {
    let totalAlocacoes = 0;
    let alocacoesTurno1 = 0;
    let alocacoesTurno2 = 0;
    let alocacoesTurno3 = 0;

    // Calcula as estatísticas
    for (const dia in escala) {
        totalAlocacoes += escala[dia][1].length + escala[dia][2].length + escala[dia][3].length;
        alocacoesTurno1 += escala[dia][1].length;
        alocacoesTurno2 += escala[dia][2].length;
        alocacoesTurno3 += escala[dia][3].length;
    }
    
    // Atualiza o HTML
    const cardTotal = document.querySelector('#card-total-alocacoes strong');
    const cardT1 = document.querySelector('#card-turno-1 strong');
    const cardT2 = document.querySelector('#card-turno-2 strong');
    const cardT3 = document.querySelector('#card-turno-3 strong');

    if (cardTotal) cardTotal.textContent = totalAlocacoes;
    if (cardT1) cardT1.textContent = alocacoesTurno1;
    if (cardT2) cardT2.textContent = alocacoesTurno2;
    if (cardT3) cardT3.textContent = alocacoesTurno3;
}