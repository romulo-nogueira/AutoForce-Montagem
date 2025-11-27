import {
    criarFuncionarioService,
    listarFuncionariosService,
    atualizarFuncionarioService,
    atualizarFuncionarioParcialService,
    deletarFuncionarioService
} from "../services/funcionarioService.js";






//  CRIAR FUNCIONÁRIO


export async function criarFuncionario(req, res) {
    try {
        const { nome, qualificacoes, turnoPreferencial } = req.body;

        // valida turno
        validarTurnoPreferencial(turnoPreferencial);

        const funcionario = await criarFuncionarioService({
            nome,
            qualificacoes,
            turnoPreferencial
        });

        return res.status(201).json(funcionario);

    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}


 //Valida o turno preferencial 
 
function validarTurnoPreferencial(turno) {
    if (turno === undefined) return; // opcional em PATCH
    const valido = [1, 2, 3];

    if (!valido.includes(Number(turno))) {
        throw new Error("turnoPreferencial inválido. Use 1, 2 ou 3.");
    }
}


//  


export async function listarFuncionarios(req, res) {
    try {
        const filtro = {};

        if (req.query.qualificacao) {
            filtro.qualificacoes = req.query.qualificacao;
        }

        const funcionarios = await listarFuncionariosService(filtro);
        return res.status(200).json(funcionarios);

    } catch (erro) {
        return res.status(500).json({ erro: erro.message });
    }
}




//  ATUALIZAR PUT


export async function atualizarFuncionario(req, res) {
    try {
        const { turnoPreferencial } = req.body;

        
        validarTurnoPreferencial(turnoPreferencial);

        const funcionario = await atualizarFuncionarioService(
            req.params.id,
            req.body
        );

        return res.status(200).json(funcionario);

    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}




//  Atualiza  PATCH


export async function atualizarFuncionarioParcial(req, res) {
    try {
        const { turnoPreferencial } = req.body;

        // valida turno 
        validarTurnoPreferencial(turnoPreferencial);

        const funcionario = await atualizarFuncionarioParcialService(
            req.params.id,
            req.body
        );

        return res.status(200).json(funcionario);

    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}




//  Deleta fuincionario

export async function deletarFuncionario(req, res) {
    try {
        await deletarFuncionarioService(req.params.id);
        return res.status(204).end();
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
}
