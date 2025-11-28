
const THEME_KEY = 'autoforceTheme';

// ====================== TEMA (DARK MODE) ======================

/**
 * Salva o tema no localStorage e aplica a classe no body.
 * @param {string} theme 'dark' ou 'light'.
 */
function setTheme(theme) {
    // 1. Salva a preferência no armazenamento local
    localStorage.setItem(THEME_KEY, theme);

    // 2. Aplica ou remove a classe 'dark-mode' no <body>
    // Isso garante que o CSS (style.css) reaja às variáveis do tema escuro.
    document.body.classList.toggle("dark-mode", theme === 'dark'); 
    
    // 3. Atualiza o ícone do botão
    const btn = document.getElementById("toggle-theme");
    if (btn) {
        btn.textContent = theme === 'dark' ? "☀️" : "🌙";
    }
}

/**
 * Carrega o tema salvo no localStorage e aplica ao iniciar.
 */
export function aplicarTema() {
    // Pega o tema salvo, ou usa 'light' como padrão.
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    setTheme(savedTheme);
}

/**
 * Alterna entre tema claro e escuro (chamado pelo onclick do botão).
 */
export function toggleTheme() {
    // Determina o tema atual olhando a classe no body
    const isDark = document.body.classList.contains("dark-mode");
    const newTheme = isDark ? 'light' : 'dark';
    
    // Aplica o novo tema
    setTheme(newTheme);
}