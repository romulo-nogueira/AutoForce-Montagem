import * as Utils from "./utils.js";
import * as Operadores from "./operadores.js";
import * as ModalAdd from "./modalAdd.js";
import * as ModalEdit from "./modalEdit.js";
import * as ModalAlocar from "./modalAlocar.js";
import * as Escalas from "./escalas.js";
import * as Estatisticas from "./estatisticas.js";
import * as Theme from "./theme.js";


// ===============================================
// MAPEAMENTO DE FUNÇÕES PARA O WINDOW (ONCLICK)
// ===============================================

window.openTab = Utils.openTab;
window.fecharModais = Utils.fecharModais;

window.abrirModalAdicionar = ModalAdd.abrirModalAdd;
window.salvarNovoOperador = ModalAdd.salvarNovoOperador;

window.salvarEdicao = ModalEdit.salvarEdicao;

window.salvarAlocacao = ModalAlocar.salvarAlocacao;

window.toggleTheme = Theme.toggleTheme;

// Módulos inteiros
window.Operadores = Operadores;
window.ModalEdit = ModalEdit;
window.ModalAlocar = ModalAlocar;
window.Escalas = Escalas;


// =======================================
// INICIALIZAÇÃO GERAL DO SISTEMA
// =======================================

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🔥 Sistema AutoForce Montagem iniciado");

    // 1️⃣ Aplica o tema salvo
    if (Theme?.aplicarTema) {
        Theme.aplicarTema();
    }

    // 2️⃣ Carrega funcionários (PRECISA vir antes da escala)
    if (Operadores?.carregarOperadores) {
        await Operadores.carregarOperadores();
    }

    // 3️⃣ Carrega a escala direto do backend, usando as alocações reais
    if (Escalas?.carregarEscalasDoBack) {
        await Escalas.carregarEscalasDoBack();
    }
});
