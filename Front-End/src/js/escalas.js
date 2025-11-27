// src/js/escalas.js
import { operadores } from "./operadores.js";
import {
    apiListarAlocacoes,
    apiCriarAlocacao,
    apiDeletarAlocacao
} from "./API.js";

import { abrirModalAlocar } from "./modalAlocar.js";
import { atualizarEstatisticasEscala } from "./estatisticas.js";

// ===============================
// ESTRUTURA DA ESCALA
// ===============================
export let escalaSemanal = {
    "Segunda":  {1: [], 2: [], 3: []},
    "Terça":    {1: [], 2: [], 3: []},
    "Quarta":   {1: [], 2: [], 3: []},
    "Quinta":   {1: [], 2: [], 3: []},
    "Sexta":    {1: [], 2: [], 3: []},
    "Sábado":   {1: [], 2: [], 3: []},
    "Domingo":  {1: [], 2: [], 3: []},
};

// Disponibilizar para o HTML
window.abrirModalAlocar = abrirModalAlocar;
window.removerOperadorDaEscala = removerOperadorDaEscala;


// ===============================
// CARREGAR ESCALAS DO BACK-END
// ===============================
export async function carregarEscalasDoBack() {
    try {
        const alocacoes = await apiListarAlocacoes();

        // Zerar a tabela
        for (const dia in escalaSemanal) {
            escalaSemanal[dia] = { 1: [], 2: [], 3: [] };
        }

        // Preencher com dados do backend
        alocacoes.forEach((item) => {

            const operador = operadores.find(o => o._id === item.funcionarioId?._id);

            if (operador && escalaSemanal[item.dia]) {
                escalaSemanal[item.dia][item.turno].push({
                    ...operador,
                    alocacaoId: item._id
                });
            }
        });

        carregarEscalas();

    } catch (error) {
        console.error("Erro ao carregar escalas:", error);
    }
}


// ===============================
// RENDERIZAR A ESCALA NA TELA
// ===============================
export function carregarEscalas() {
    const wrapper = document.getElementById("tabela-escala");
    if (!wrapper) return;

    let html = `
        <table class="tabela-escala-turnos">
            <thead>
                <tr>
                    <th>Dia/Turno</th>
                    <th>Turno 1<br><small>(06:00–14:00)</small></th>
                    <th>Turno 2<br><small>(14:00–22:00)</small></th>
                    <th>Turno 3<br><small>(22:00–06:00)</small></th>
                </tr>
            </thead>
            <tbody>
    `;

    const dias = Object.keys(escalaSemanal);

    dias.forEach(dia => {
        const total = [
            ...escalaSemanal[dia][1],
            ...escalaSemanal[dia][2],
            ...escalaSemanal[dia][3]
        ].length;

        html += `
            <tr>
                <td>
                    <strong>${dia}</strong>
                    <span class="alocacoes-dia">${total} alocações</span>
                </td>
        `;

        for (let turno = 1; turno <= 3; turno++) {
            const lista = escalaSemanal[dia][turno];

            let slot = `<div class="slot-container">`;

            lista.forEach(op => {
                slot += `
                    <div class="operador-slot-card">
                        <button class="btn-remove"
                            onclick="removerOperadorDaEscala('${dia}', ${turno}, '${op.alocacaoId}')">
                            X
                        </button>
                        <strong>${op.nome}</strong>
                        <span>${op.matricula}</span>
                        <div class="qualificacoes">
                            ${op.qualificacoes.map(q => `<span>${q}</span>`).join("")}
                        </div>
                    </div>`;
            });

            slot += `
                <button class="slot-adicionar"
                    onclick="abrirModalAlocar('${dia}', ${turno})">
                    + Adicionar
                </button>
            `;

            if (lista.length === 0) {
                slot += `<span class="slot-vago">Nenhum operador alocado</span>`;
            }

            slot += `</div>`;
            html += `<td>${slot}</td>`;
        }

        html += `</tr>`;
    });

    html += `</tbody></table>`;
    wrapper.innerHTML = html;

    atualizarEstatisticasEscala(escalaSemanal);
}


// ===============================
// ADICIONAR OPERADOR (ALOCAR)
// ===============================

export async function adicionarOperadorAEscala(dia, turno, operadorId) {
    try {
        const resp = await apiCriarAlocacao({
            funcionarioId: operadorId,
            dia,
            turno
        });

        // ⚠️ AQUI: Regra de negócio impedindo a alocação
        if (resp.erro) {
            alert(resp.erro); // << ALERTA PARA O USUÁRIO
            return;
        }

        await carregarEscalasDoBack();

    } catch (error) {
        alert("Erro ao criar alocação.");
        console.error("Erro:", error);
    }
}


// ===============================
// REMOVER ALOCAÇÃO
// ===============================
export async function removerOperadorDaEscala(dia, turno, alocacaoId) {
    const confirmar = confirm("Deseja remover este operador?");
    if (!confirmar) return;

    try {
        await apiDeletarAlocacao(alocacaoId);
        await carregarEscalasDoBack();
    } catch (error) {
        alert("Erro ao remover alocação.");
        console.error(error);
    }
}
