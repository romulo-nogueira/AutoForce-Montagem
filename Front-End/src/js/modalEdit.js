import { obterOperadorPorId, carregarOperadores } from "./operadores.js";
import { fecharModais } from "./utils.js";
import { apiAtualizarFuncionario } from "./API.js";

let operadorEmEdicaoId = null;

// ====================== MODAL EDITAR ======================
export function abrirModalEditar(id) {
  const operador = obterOperadorPorId(id);
  if (!operador) {
    alert("Operador não encontrado para edição.");
    return;
  }

  operadorEmEdicaoId = id;

  // Preenche os campos do modal com os dados atuais
  document.getElementById("edit-nome").value = operador.nome || "";
  document.getElementById("edit-qual").value = (operador.qualificacoes || []).join(", ");
  document.getElementById("edit-turno").value = operador.turnoPreferencial
    ? operador.turnoPreferencial.toString()
    : "1";

  document.getElementById("modal-edit").style.display = "flex";
}

/**
 * Salva as alterações feitas no modal de edição.
 */
export async function salvarEdicao() {
  if (!operadorEmEdicaoId) return;

  const nome = document.getElementById("edit-nome").value.trim();
  const qualificacoesString = document.getElementById("edit-qual").value.trim();
  const turno = Number(document.getElementById("edit-turno").value);

  if (!nome) {
    alert("O campo Nome é obrigatório.");
    return;
  }

  const qualificacoes = qualificacoesString
    ? qualificacoesString.split(",").map(q => q.trim()).filter(q => q.length > 0)
    : [];

  const payload = {
    nome,
    qualificacoes,
    turnoPreferencial: turno
  };

  try {
    const resp = await apiAtualizarFuncionario(operadorEmEdicaoId, payload);

    // Se a API retorna um objeto com erro
    if (resp?.erro || resp?.error || resp?.message) {
      const msg = resp.erro || resp.error || resp.message;
      alert(msg);
      return;
    }

    // Recarrega do backend para garantir consistência
    await carregarOperadores();

    // limpa e fecha
    operadorEmEdicaoId = null;
    fecharModais();
  } catch (err) {
    console.error("Erro ao atualizar funcionário:", err);
    alert("Erro ao atualizar funcionário. Veja console para detalhes.");
  }
}