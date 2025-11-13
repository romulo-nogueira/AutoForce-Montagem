function add(){
// Exemplo: simulando retorno do backend
const operadores = [
    {
      matricula: "OP-001",
      nome: "João Silva",
      qualificacoes: ["Solda Robótica", "Montagem"],
      turno: "Turno 1 (06:00–14:00)"
    },
    {
      matricula: "OP-002",
      nome: "Maria Santos",
      qualificacoes: ["Inspeção Elétrica", "Controle de Qualidade"],
      turno: "Turno 2 (14:00–22:00)"
    }
  ];
  
  // Função para renderizar
  function renderTabela() {
    const tbody = document.querySelector("#tabela-operadores tbody");
    tbody.innerHTML = ""; // limpa conteúdo anterior
  
    operadores.forEach(op => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${op.matricula}</td>
        <td>${op.nome}</td>
        <td>${op.qualificacoes.map(q => `<span class="qualificacao">${q}</span>`).join(" ")}</td>
        <td>${op.turno}</td>
        <td class="actions">
          <button><img src="src/assets/image/icon-edit.png" alt="Editar"></button>
          <button><img src="src/assets/image/icon-delete.png" alt="Excluir"></button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  // Chama a função ao carregar
  renderTabela();
}add();