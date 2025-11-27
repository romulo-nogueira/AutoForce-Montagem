const API_URL = "http://192.168.1.7:3000";

//  FUNCIONÁRIOS 
export async function apiListarFuncionarios() {
  const resp = await fetch(`${API_URL}/funcionarios`);
  return resp.json();
}

export async function apiCriarFuncionario(data) {
  const resp = await fetch(`${API_URL}/funcionarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return resp.json();
}

export async function apiAtualizarFuncionario(id, data) {
  const resp = await fetch(`${API_URL}/funcionarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return resp.json();
}

export async function apiDeletarFuncionario(id) {
  return await fetch(`${API_URL}/funcionarios/${id}`, { method: "DELETE" });
}


// ALOCAÇÕES 
export async function apiListarAlocacoes() {
  const resp = await fetch(`${API_URL}/alocacoes`);
  return resp.json();
}

export async function apiCriarAlocacao(data) {
  const resp = await fetch(`${API_URL}/alocacoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return resp.json();
}

export async function apiDeletarAlocacao(id) {
  return await fetch(`${API_URL}/alocacoes/${id}`, { method: "DELETE" });
}
