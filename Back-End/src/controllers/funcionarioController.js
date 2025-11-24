import {
    criarFuncionarioService,
    listarFuncionariosService,
    atualizarFuncionarioService,
    atualizarFuncionarioParcialService,
    deletarFuncionarioService
} from "../services/funcionarioService.js";

export async function criarFuncionario(req, res) {
    try {
        const funcionario = await criarFuncionarioService(req.body);
        res.status(201).json(funcionario);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
}

export async function listarFuncionarios(req, res) {
    try {
        const filtro = {};

        if (req.query.qualificacao) {
            filtro.qualificacoes = req.query.qualificacao;
        }

        const funcionarios = await listarFuncionariosService(filtro);
        res.json(funcionarios);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

export async function atualizarFuncionario(req, res) {
    try {
        const funcionario = await atualizarFuncionarioService(req.params.id, req.body);
        res.json(funcionario);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
}

export async function atualizarFuncionarioParcial(req, res) {
    try {
        const funcionario = await atualizarFuncionarioParcialService(req.params.id, req.body);
        res.json(funcionario);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
}

export async function deletarFuncionario(req, res) {
    try {
        await deletarFuncionarioService(req.params.id);
        res.status(204).end();
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
}
