import express from "express";
import {
    criarFuncionario,
    listarFuncionarios,
    atualizarFuncionario,
    atualizarFuncionarioParcial,
    deletarFuncionario
} from "../controllers/funcionarioController.js";

const router = express.Router();

router.post("/", criarFuncionario);
router.get("/", listarFuncionarios);
router.put("/:id", atualizarFuncionario);
router.patch("/:id", atualizarFuncionarioParcial);
router.delete("/:id", deletarFuncionario);

export default router;
