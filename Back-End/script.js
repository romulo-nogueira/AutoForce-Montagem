// ====================== DATABASE (mock) ======================
let operadores = [
  { id: "OP-001", nome: "João Silva", qualificacoes: ["Solda Robótica", "Montagem"], turnoPreferencial: 1 },
  { id: "OP-002", nome: "Maria Santos", qualificacoes: ["Inspeção Elétrica", "Controle de Qualidade"], turnoPreferencial: 2 },
  { id: "OP-003", nome: "Pedro Costa", qualificacoes: ["Prensagem", "Montagem"], turnoPreferencial: 1 },
  { id: "OP-004", nome: "Ana Oliveira", qualificacoes: ["Pintura", "Controle de Qualidade"], turnoPreferencial: 3 },
  { id: "OP-005", nome: "Carlos Mendes", qualificacoes: ["Solda Robótica", "Inspeção Elétrica"], turnoPreferencial: 2 }
];

const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

let escala = {
  Segunda: {1:["OP-001"],2:["OP-002"],3:["OP-004"]},
  Terça: {1:["OP-003"],2:["OP-005"],3:[]},
  Quarta: {1:[],2:[],3:[]},
  Quinta: {1:[],2:[],3:[]},
  Sexta: {1:[],2:[],3:[]},
};

// ======================= HELPERS =======================
function gerarNovoId() {
  // busca maior número já existente e incrementa
  const nums = operadores
    .map(o => {
      const m = o.id.match(/OP-(\d+)/);
      return m ? Number(m[1]) : 0;
    })
    .sort((a,b) => b - a);
  const prox = (nums[0] || 0) + 1;
  return "OP-" + String(prox).padStart(3, "0");
}

// ======================= NAVEGAÇÃO =======================
function openTab(tab) {
  document.querySelectorAll(".content").forEach(c => c.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

  document.getElementById(tab).classList.add("active");

  if (tab === "colaboradores") {
      document.querySelectorAll(".tab")[0].classList.add("active");
  } else {
      document.querySelectorAll(".tab")[1].classList.add("active");
  }
}

// ======================= RENDER COLABORADORES =======================
function renderColaboradores() {
  const tbody = document.getElementById("tabela-colaboradores");
  const cards = document.getElementById("cards-colaboradores");

  tbody.innerHTML = "";
  const qualificacoesUnicas = new Set(operadores.flatMap(op => op.qualificacoes));
  const mediaQual = operadores.length === 0 ? 0 : (operadores.reduce((acc, op) => acc + op.qualificacoes.length, 0) / operadores.length);

  cards.innerHTML = `
      <div class="card blue"><h3>Total de Operadores</h3><span class="number">${operadores.length}</span></div>
      <div class="card green"><h3>Qualificações Únicas</h3><span class="number">${qualificacoesUnicas.size}</span></div>
      <div class="card purple"><h3>Média Qualificações/Op.</h3><span class="number">${mediaQual.toFixed(1)}</span></div>
  `;

  operadores.forEach(op => {
      tbody.innerHTML += `
          <tr>
              <td>${op.id}</td>
              <td>${op.nome}</td>
              <td>${op.qualificacoes.map(q => `<span class="tag">${q}</span>`).join("")}</td>
              <td>Turno ${op.turnoPreferencial}</td>
              <td>
                  <button class="edit" onclick="abrirModalEditar('${op.id}')">✏️</button>
                  <button class="delete" onclick="removerOperador('${op.id}')">🗑️</button>
              </td>
          </tr>
      `;
  });
}

// ======================= RENDER ESCALA =======================
function renderEscala() {
  const container = document.getElementById("tabela-escala");
  const cards = document.getElementById("cards-escala");

  let turno1 = 0, turno2 = 0, turno3 = 0;

  Object.values(escala).forEach(dia => {
      turno1 += dia[1].length;
      turno2 += dia[2].length;
      turno3 += dia[3].length;
  });

  cards.innerHTML = `
      <div class="card blue"><h3>Total Alocações</h3><span class="number">${turno1 + turno2 + turno3}</span></div>
      <div class="card green"><h3>Turno 1</h3><span class="number">${turno1}</span></div>
      <div class="card yellow"><h3>Turno 2</h3><span class="number">${turno2}</span></div>
      <div class="card purple"><h3>Turno 3</h3><span class="number">${turno3}</span></div>
  `;

  container.innerHTML = `
      <div class="escala-header">
          <div>Dia</div>
          <div>Turno 1<br><small>(06:00–14:00)</small></div>
          <div>Turno 2<br><small>(14:00–22:00)</small></div>
          <div>Turno 3<br><small>(22:00–06:00)</small></div>
      </div>
  `;

  diasSemana.forEach(dia => {
      container.innerHTML += `
          <div class="linha">
              <div class="dia">${dia}</div>

              ${[1, 2, 3].map(turno => `
                  <div class="slot">
                      ${
                          escala[dia][turno].length === 0
                          ? `<button class="add-btn" onclick="abrirModalAlocar('${dia}', ${turno})">+ Alocar</button>`
                          : escala[dia][turno].map(id => {
                              const op = operadores.find(o => o.id === id) || { nome: id };
                              return `<div class="card-op" onclick="removerDaEscala('${dia}', ${turno}, '${id}')">${op.nome}</div>`;
                          }).join("")
                      }
                  </div>
              `).join("")}
          </div>
      `;
  });
}

// ======================= MODAL: ADICIONAR OPERADOR =======================
function abrirModalAdicionar() {
  const modal = document.getElementById("modal-add");
  if (!modal) return;
  modal.classList.add("open");

  document.getElementById("add-nome").value = "";
  document.getElementById("add-qual").value = "";
  document.getElementById("add-turno").value = "1";
}

function salvarNovoOperador() {
  const inputNome = document.getElementById("add-nome");
  const inputQual = document.getElementById("add-qual");
  const inputTurno = document.getElementById("add-turno");

  if (!inputNome || !inputQual || !inputTurno) return alert("Elementos do modal ausentes.");

  const nome = inputNome.value.trim();
  const qualStr = inputQual.value.trim();
  const turno = Number(inputTurno.value);

  if (nome === "" || qualStr === "") {
      alert("Preencha todos os campos.");
      return;
  }

  const qualificacoes = qualStr.split(",").map(q => q.trim()).filter(q => q.length > 0);

  const novo = {
      id: gerarNovoId(),
      nome,
      qualificacoes,
      turnoPreferencial: turno
  };

  operadores.push(novo);

  fecharModais();
  renderColaboradores();
  renderEscala();
}

// ======================= MODAL: EDITAR OPERADOR (CORRIGIDO) =======================
let operadorEditando = null;

function abrirModalEditar(id) {
  operadorEditando = operadores.find(o => o.id === id);
  if (!operadorEditando) return alert("Operador não encontrado.");

  const modal = document.getElementById("modal-edit");
  if (!modal) return alert("Modal de edição não encontrado no DOM.");

  document.getElementById("edit-nome").value = operadorEditando.nome;
  document.getElementById("edit-qual").value = operadorEditando.qualificacoes.join(", ");
  document.getElementById("edit-turno").value = operadorEditando.turnoPreferencial;

  modal.classList.add("open");
}

function salvarEdicao() {
  if (!operadorEditando) return alert("Nenhum operador carregado para edição.");

  const nome = document.getElementById("edit-nome").value.trim();
  const qualStr = document.getElementById("edit-qual").value.trim();
  const turno = Number(document.getElementById("edit-turno").value);

  if (nome === "" || qualStr === "") {
      alert("Preencha todos os campos.");
      return;
  }

  operadorEditando.nome = nome;
  operadorEditando.qualificacoes = qualStr.split(",").map(q => q.trim());
  operadorEditando.turnoPreferencial = turno;

  fecharModais();
  renderColaboradores();
  renderEscala(); // garante atualização dos nomes na grade
}

// ======================= MODAL: ALOCAR (CORRIGIDO) =======================
let diaSelecionado = null;
let turnoSelecionado = null;

function abrirModalAlocar(dia, turno) {
  diaSelecionado = dia;
  turnoSelecionado = turno;

  const select = document.getElementById("select-operador");
  if (!select) return alert("Elemento select-operador não encontrado.");

  select.innerHTML = "";

  operadores.forEach(op => {
      // impede operador já alocado em qualquer turno no mesmo dia
      const jaNoDia = [1,2,3].some(t => escala[dia][t].includes(op.id));

      // permitir exibir apenas quem NÃO está alocado no mesmo dia
      if (!jaNoDia) {
          select.innerHTML += `<option value="${op.id}">${op.nome}</option>`;
      }
  });

  // se não há opções, adicionar um placeholder desabilitado
  if (select.children.length === 0) {
      select.innerHTML = `<option value="" disabled selected>-- Nenhum operador disponível --</option>`;
  }

  document.getElementById("modal-alocar").classList.add("open");
}

function salvarAlocacao() {
  const sel = document.getElementById("select-operador");
  if (!sel) return alert("Elemento select-operador ausente.");

  const opId = sel.value;
  if (!opId) {
      alert("Nenhum operador disponível para este dia.");
      return;
  }

  // impede duplicado no mesmo turno
  if (escala[diaSelecionado][turnoSelecionado].includes(opId)) {
      alert("Operador já está neste turno.");
      return;
  }

  // impede que o operador esteja em outro turno do mesmo dia (defesa extra)
  const jaNoDia = [1,2,3].some(t => escala[diaSelecionado][t].includes(opId));
  if (jaNoDia) {
      alert("Operador já alocado em outro turno deste dia.");
      return;
  }

  escala[diaSelecionado][turnoSelecionado].push(opId);

  fecharModais();
  renderEscala();
}

// ======================= REMOVER OPERADOR =======================
function removerOperador(id) {
  if (!confirm("Excluir operador?")) return;

  operadores = operadores.filter(o => o.id !== id);

  diasSemana.forEach(dia => {
      [1,2,3].forEach(turno => {
          escala[dia][turno] = escala[dia][turno].filter(op => op !== id);
      });
  });

  renderColaboradores();
  renderEscala();
}

// ======================= REMOVER DA ESCALA =======================
function removerDaEscala(dia, turno, id) {
  escala[dia][turno] = escala[dia][turno].filter(op => op !== id);
  renderEscala();
}

// ======================= FECHAR MODAIS =======================
function fecharModais() {
  document.querySelectorAll(".modal").forEach(m => m.classList.remove("open"));
}

// ======================= START =======================
renderColaboradores();
renderEscala();
