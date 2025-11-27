const toggleThemeBtn = document.getElementById("toggle-theme");

toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // muda ícone
    if (document.body.classList.contains("dark-mode")) {
        toggleThemeBtn.textContent = "☀️";
    } else {
        toggleThemeBtn.textContent = "🌙";
    }
});
