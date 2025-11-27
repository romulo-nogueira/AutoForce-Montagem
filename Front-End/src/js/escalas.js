// src/js/escalas.js

import { obterOperadorPorId } from "./operadores.js";
import { abrirModalAlocar } from "./modalAlocar.js";
import { atualizarEstatisticasEscala } from "./estatisticas.js";

// ====================== ESCALA SEMANAL ======================

// Estrutura de dados básica para a escala (com dados iniciais para simular a imagem)
// Garantir que os operadores existam antes de adicioná-los
const op1 = obterOperadorPorId("OP-001");
const op2 = obterOperadorPorId("OP-002");
const op3 = obterOperadorPorId("OP-003");
const op4 = obterOperadorPorId("OP-004");
const op5 = obterOperadorPorId("OP-005");

export let escalaSemanal = {
    "Segunda": { 
        1: op1 ? [op1] : [], 
        2: op2 ? [op2] : [], 
        3: op4 ? [op4] : [] 
    },
    "Terça": { 
        1: op3 ? [op3] : [], 
        2: op5 ? [op5] : [], 
        3: [] 
    },
    "Quarta": { 1: [], 2: [], 3: [] },
    "Quinta": { 1: [], 2: [], 3: [] },
    "Sexta": { 1: [], 2: [], 3: [] },
    "Sábado": { 1: [], 2: [], 3: [] },
    "Domingo": { 1: [], 2: [], 3: [] },
};

// Mapeamento global para que as funções sejam acessíveis no HTML
window.abrirModalAlocar = abrirModalAlocar;
window.removerOperadorDaEscala = removerOperadorDaEscala;


/**
 * Função utilitária para gerar as tags HTML de qualificação dentro do card da escala.
 * (NÃO MUDOU)
 */
function gerarTagsQualificacoes(qualificacoes) {
    return qualificacoes.map(q => `<span>${q}</span>`).join('');
}


/**
 * Renderiza a tabela de escala semanal na seção correspondente.
 * (CORREÇÃO: Garantir que a atualização das estatísticas aconteça no final)
 */
export function carregarEscalas() {
    const escalaWrapper = document.getElementById("tabela-escala");
    if (!escalaWrapper) return;
    
    // ... (restante do código HTML da tabela - Não houve alteração na estrutura)
    let html = `
        <table class="tabela-escala-turnos">
            <thead>
                <tr>
                    <th>Dia/Turno</th>
                    <th>Turno 1 <span>(06:00-14:00)</span></th>
                    <th>Turno 2 <span>(14:00-22:00)</span></th>
                    <th>Turno 3 <span>(22:00-06:00)</span></th>
                </tr>
            </thead>
        <tbody>
    `;

    const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

    dias.forEach(dia => {
        let alocacoesDoDia = escalaSemanal[dia][1].length + escalaSemanal[dia][2].length + escalaSemanal[dia][3].length;
        
        // Coluna Dia/Turno e Total de Alocações no Dia
        html += `
            <tr>
                <td>
                    <strong>${dia}</strong>
                    <span class="alocacoes-dia">${alocacoesDoDia} alocação${alocacoesDoDia !== 1 ? 'ões' : ''}</span>
                </td>
        `;
        
        for (let t = 1; t <= 3; t++) {
            const alocados = escalaSemanal[dia][t].filter(op => op !== undefined && op !== null);

            let conteudoSlot = `<div class="slot-container">`;

            if (alocados.length > 0) {
                // Renderiza os cards de operadores
                conteudoSlot += alocados.map(op => `
                    <div class="operador-slot-card">
                        <button class="btn-remove" title="Remover" onclick="removerOperadorDaEscala('${dia}', ${t}, '${op.id}')">X</button>
                        <strong>${op.nome}</strong>
                        <span>${op.id}</span>
                        <div class="qualificacoes">
                            ${gerarTagsQualificacoes(op.qualificacoes)}
                        </div>
                    </div>
                `).join('');
                
            } else {
                // Renderiza slot vago
                // Removido o <span class="slot-vago"> para não competir com o botão Adicionar em slots muito pequenos.
                // Agora o slot-vago só aparecerá se não houver cards.
            }
            
            // Adiciona o botão de alocar no final do slot
            conteudoSlot += `<button class="slot-adicionar" onclick="abrirModalAlocar('${dia}', ${t})">+ Adicionar</button>`;

            // Se o slot estiver vazio, exibe o VAGO
            if (alocados.length === 0) {
                conteudoSlot += `<span class="slot-vago">Nenhum operador alocado.</span>`;
            }

            conteudoSlot += `</div>`;
            
            html += `<td data-dia="${dia}" data-turno="${t}">${conteudoSlot}</td>`;
        }
        html += '</tr>';
    });

    html += '</tbody></table>';
    escalaWrapper.innerHTML = html;
    
    // ATUALIZAÇÃO CORRIGIDA: Garante que os cards de estatísticas sejam atualizados
    atualizarEstatisticasEscala(escalaSemanal);
    console.log("Escala semanal carregada e atualizada.");
}

/**
 * Remove um operador de um slot específico da escala.
 * (NÃO MUDOU - Já estava correto)
 */
export function removerOperadorDaEscala(dia, turno, operadorId) {
    const confirmacao = confirm(`Tem certeza que deseja remover o operador ${operadorId} do ${dia}, Turno ${turno}?`);
    if (confirmacao) {
        let alocados = escalaSemanal[dia][turno];
        const index = alocados.findIndex(op => op.id === operadorId);
        
        if (index > -1) {
            alocados.splice(index, 1);
            carregarEscalas(); // Recarrega a visualização
            console.log(`Operador ${operadorId} removido da escala.`);
        }
    }
}

/**
 * Adiciona um operador ao slot da escala.
 * (NÃO MUDOU - Já estava correto)
 */
export function adicionarOperadorAEscala(dia, turno, operadorId) {
    const operador = obterOperadorPorId(operadorId);
    if (!operador) {
        console.error("Operador não encontrado.");
        return;
    }

    // Verifica se o operador já está neste turno/dia (evita duplicatas simples)
    if (escalaSemanal[dia][turno].some(op => op.id === operadorId)) {
        alert("Este operador já está alocado neste slot.");
        return;
    }

    // Adicionar o operador no array do slot
    escalaSemanal[dia][turno].push(operador);
    carregarEscalas(); // Recarrega a visualização e atualiza estatísticas
}