import {
    criarAlocacaoService,
    listarAlocacoesService,
    deletarAlocacaoService
} from "../services/alocacaoService.js";

export async function criarAlocacao(req, res) {
    try {
        const alocacao = await criarAlocacaoService(req.body);
        res.status(201).json(alocacao);
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
}

export async function listarAlocacoes(req, res) {
    try {
        const alocacoes = await listarAlocacoesService();
        res.json(alocacoes);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

export async function deletarAlocacao(req, res) {
    try {
        await deletarAlocacaoService(req.params.id);
        res.status(204).end();
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
}
