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
  const nums = operadores
    .map(o => Number(o.id.replace("OP-", "")))
    .sort((a,b) => b - a);
  return "OP-" + String(nums[0] + 1).padStart(3, "0");
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
  const mediaQual = operadores.length 
    ? operadores.reduce((acc,op)=>acc+op.qualificacoes.length,0)/operadores.length 
    : 0;

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

  let t1 = 0, t2 = 0, t3 = 0;

  Object.values(escala).forEach(dia => {
    t1 += dia[1].length;
    t2 += dia[2].length;
    t3 += dia[3].length;
  });

  cards.innerHTML = `
    <div class="card blue"><h3>Total Alocações</h3><span class="number">${t1+t2+t3}</span></div>
    <div class="card green"><h3>Turno 1</h3><span class="number">${t1}</span></div>
    <div class="card yellow"><h3>Turno 2</h3><span class="number">${t2}</span></div>
    <div class="card purple"><h3>Turno 3</h3><span class="number">${t3}</span></div>
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

        ${[1,2,3].map(turno => `
          <div class="slot">
            ${
              escala[dia][turno].length === 0
              ? `<button class="add-btn" onclick="abrirModalAlocar('${dia}', ${turno})">+ Alocar</button>`
              : escala[dia][turno].map(id => {
                    const op = operadores.find(o => o.id === id);
                    return `<div class="card-op" onclick="removerDaEscala('${dia}', ${turno}, '${id}')">${op?.nome ?? id}</div>`;
                }).join("")
            }
          </div>
        `).join("")}

      </div>
    `;
  });

}

// ======================= MODAL: ADICIONAR =======================
function abrirModalAdicionar() {
  document.getElementById("modal-add").classList.add("open");
}

function salvarNovoOperador() {
  const nome = document.getElementById("add-nome").value.trim();
  const qualStr = document.getElementById("add-qual").value.trim();
  const turno = Number(document.getElementById("add-turno").value);

  if (!nome || !qualStr) return alert("Preencha todos os campos.");

  const novo = {
    id: gerarNovoId(),
    nome,
    qualificacoes: qualStr.split(",").map(q=>q.trim()),
    turnoPreferencial: turno
  };

  operadores.push(novo);

  fecharModais();
  renderColaboradores();
  renderEscala();
}

// ======================= MODAL: EDITAR =======================
let operadorEditando = null;

function abrirModalEditar(id) {
  operadorEditando = operadores.find(o => o.id === id);
  if (!operadorEditando) return;

  document.getElementById("edit-nome").value = operadorEditando.nome;
  document.getElementById("edit-qual").value = operadorEditando.qualificacoes.join(", ");
  document.getElementById("edit-turno").value = operadorEditando.turnoPreferencial;

  document.getElementById("modal-edit").classList.add("open");
}

function salvarEdicao() {
  const nome = document.getElementById("edit-nome").value.trim();
  const qualStr = document.getElementById("edit-qual").value.trim();
  const turno = Number(document.getElementById("edit-turno").value);

  if (!nome || !qualStr) return alert("Preencha todos os campos.");

  operadorEditando.nome = nome;
  operadorEditando.qualificacoes = qualStr.split(",").map(q=>q.trim());
  operadorEditando.turnoPreferencial = turno;

  fecharModais();
  renderColaboradores();
  renderEscala();
}

// ======================= MODAL: ALOCAR =======================
let diaSelecionado = null;
let turnoSelecionado = null;

function abrirModalAlocar(dia, turno) {
  diaSelecionado = dia;
  turnoSelecionado = turno;

  const sel = document.getElementById("select-operador");
  sel.innerHTML = "";

  operadores.forEach(op=>{
    const jaNoDia = [1,2,3].some(t=>escala[dia][t].includes(op.id));
    if (!jaNoDia) {
      sel.innerHTML += `<option value="${op.id}">${op.nome}</option>`;
    }
  });

  if (sel.innerHTML === "") {
    sel.innerHTML = `<option disabled>-- Nenhum operador disponível --</option>`;
  }

  document.getElementById("modal-alocar").classList.add("open");
}

function salvarAlocacao() {
  const opId = document.getElementById("select-operador").value;
  if (!opId) return alert("Nenhum operador disponível.");

  escala[diaSelecionado][turnoSelecionado].push(opId);

  fecharModais();
  renderEscala();
}

// ======================= REMOVER OP =======================
function removerOperador(id) {
  if (!confirm("Excluir operador?")) return;

  operadores = operadores.filter(o=>o.id!==id);

  diasSemana.forEach(dia=>{
    [1,2,3].forEach(turno=>{
      escala[dia][turno] = escala[dia][turno].filter(op=>op!==id);
    });
  });

  renderColaboradores();
  renderEscala();
}

function removerDaEscala(dia, turno, id) {
  escala[dia][turno] = escala[dia][turno].filter(op => op !== id);
  renderEscala();
}


// ======================= FECHAR =======================
function fecharModais() {
  document.querySelectorAll(".modal").forEach(m=>m.classList.remove("open"));
}

// ======================= START =======================
renderColaboradores();
renderEscala();
