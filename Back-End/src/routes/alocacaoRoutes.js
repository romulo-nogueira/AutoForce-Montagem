import express from "express";
import {
    criarAlocacao,
    listarAlocacoes,
    deletarAlocacao
} from "../controllers/alocacaoController.js";

const router = express.Router();

router.post("/", criarAlocacao);
router.get("/", listarAlocacoes);
router.delete("/:id", deletarAlocacao);

export default router;
