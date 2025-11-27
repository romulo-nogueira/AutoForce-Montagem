import { fecharModais } from "./utils.js";
import { operadores } from "./operadores.js";
import { adicionarOperadorAEscala } from "./escalas.js";

let slotEmAlocacao = { dia: null, turno: null };

function popularSelectOperadores() {
    const select = document.getElementById("select-operador");
    if (!select) return;

    select.innerHTML = `<option value="">Selecione um operador...</option>`;

    operadores.forEach(op => {
        const option = document.createElement("option");

        // 🔥 SEMPRE USAR _id, este é o valor REAL
        option.value = op._id;

        const qualificacoes = op.qualificacoes?.join(", ") || "Sem qualificações";

        option.textContent = `${op.nome} - ${qualificacoes}`;
        
        select.appendChild(option);
    });
}

export function abrirModalAlocar(dia, turno) {
    slotEmAlocacao = { dia, turno };
    popularSelectOperadores();

    document.getElementById("alocar-dia").textContent = dia;
    document.getElementById("alocar-turno-info").textContent = `Turno ${turno}`;
    document.getElementById("modal-alocar").style.display = "flex";
}

export function salvarAlocacao() {
    const operadorId = document.getElementById("select-operador").value;

    if (!operadorId) {
        alert("Selecione um operador.");
        return;
    }

    // 🔥 AGORA envia o ObjectId REAL
    adicionarOperadorAEscala(
        slotEmAlocacao.dia,
        slotEmAlocacao.turno,
        operadorId
    );

    fecharModais();
}