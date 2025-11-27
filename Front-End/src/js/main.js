// src/js/main.js

// =============================
// IMPORTAÇÃO DE TODOS OS MÓDULOS
// =============================
import * as Utils from "./utils.js";
import * as Operadores from "./operadores.js";
import * as ModalAdd from "./modalAdd.js";
import * as ModalEdit from "./modalEdit.js";
import * as ModalAlocar from "./modalAlocar.js";
import * as Escalas from "./escalas.js";
import * as Estatisticas from "./estatisticas.js"; 
import * as Theme from "./theme.js";


// ===============================================
// EXPORTAR PRO WINDOW (Mapeamento de Funções ONCLICK)
// ===============================================

// Funções chamadas no HTML (onclick="...")
window.openTab = Utils.openTab; 
window.fecharModais = Utils.fecharModais; 
window.abrirModalAdicionar = ModalAdd.abrirModalAdd;
window.salvarNovoOperador = ModalAdd.salvarNovoOperador;
window.salvarEdicao = ModalEdit.salvarEdicao; 
window.salvarAlocacao = ModalAlocar.salvarAlocacao; 
window.toggleTheme = Theme.toggleTheme; 

// Módulos (Para acesso a métodos específicos no HTML)
window.Operadores = Operadores;
window.ModalEdit = ModalEdit;
window.ModalAlocar = ModalAlocar;
window.Escalas = Escalas;


// =======================================
// INICIALIZAÇÃO GERAL DO PROJETO
// =======================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("Sistema AutoForce Montagem iniciado (ES Modules funcionando)");

    // Funções de inicialização
    if (Theme?.aplicarTema) Theme.aplicarTema(); // Aplica o tema salvo primeiro
    if (Operadores?.carregarOperadores) Operadores.carregarOperadores(); // Carrega colaboradores e estatísticas
    if (Escalas?.carregarEscalas) Escalas.carregarEscalas(); // Carrega a escala e estatísticas da escala
});