import { 
    apiListarFuncionarios,
    apiCriarFuncionario,
    apiAtualizarFuncionario,
    apiDeletarFuncionario
} from "./API.js";

import { fecharModais } from "./utils.js";

// Salva os operdores no BD
export let operadores = [];


export async function carregarOperadores() {
    try {
        operadores = await apiListarFuncionarios();

        const tabela = document.getElementById("tabela-colaboradores");
        if (!tabela) return;

        tabela.innerHTML = "";

        operadores.forEach(op => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${op.matricula}</td>
                <td>${op.nome}</td>
                <td>${op.qualificacoes.map(q => `<span class="tag">${q}</span>`).join("")}</td>
                <td>Turno ${op.turnoPreferencial}</td>
                <td>
                    <button class="btn-edit" onclick="ModalEdit.abrirModalEditar('${op._id}')">Editar</button>
                    <button class="btn-delete" onclick="Operadores.deletarOperador('${op._id}')">Excluir</button>
                    
                </td>
            `;

            tabela.appendChild(linha);
        });

    } catch (error) {
        console.error("Erro ao carregar funcionários:", error);
        alert("Erro ao carregar funcionários.");
    }
}

//Cria operador
export async function adicionarOperador(novo) {
    try {
        await apiCriarFuncionario(novo);
        await carregarOperadores();
        fecharModais();
    } catch (error) {
        console.error("Erro ao criar funcionário:", error);
        alert("Erro ao criar funcionário.");
    }
}

////Atualiza Funcionadio
export async function atualizarOperador(id, data) {
    try {
        await apiAtualizarFuncionario(id, data);
        await carregarOperadores();
        fecharModais();
    } catch (error) {
        console.error("Erro ao atualizar funcionário:", error);
        alert("Erro ao atualizar funcionário.");
    }
}

//Deleta operador

export async function deletarOperador(id) {
    const confirmar = confirm(`Deseja excluir o funcionário ${id}?`);
    if (!confirmar) return;

    try {
        await apiDeletarFuncionario(id);
        await carregarOperadores();
    } catch (error) {
        console.error("Erro ao deletar funcionário:", error);
        alert("Erro ao deletar funcionário.");
    }
}


 //Lista de Funcionarios
 
export function obterOperadorPorId(id) {
    return operadores.find(op => op._id === id);
}