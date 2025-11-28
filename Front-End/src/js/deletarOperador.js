import { operadores, carregarOperadores } from "./operadores.js";

export function excluirOperador(id) {
    const index = operadores.findIndex(o => o.id === id);
    if (index !== -1) operadores.splice(index, 1);

    carregarOperadores();
}
