// src/js/utils.js

/**
 * Alterna entre abas de conteúdo.
 * @param {string} tabName O ID da seção a ser exibida.
 */
export function openTab(tabName) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
    document.querySelector(`.tab[onclick*='${tabName}']`).classList.add('active');
}

/**
 * Fecha todos os modais.
 */
export function fecharModais() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

/**
 * Gera um ID único simples (ex: AUTO-1234).
 * @returns {string} O ID gerado.
 */
export function gerarId() {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substr(2, 5);
    return `OP-${timestamp}-${randomNum}`.toUpperCase().substring(0, 8);
}