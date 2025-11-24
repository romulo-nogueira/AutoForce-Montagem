import express from "express";
import funcionariosRoutes from "../routes/funcionariosRoutes.js";
import alocacaoRoutes from "../routes/alocacaoRoutes.js";

export default function routes(app) {

    app.get("/", (req, res) => {
        res.send("🚀 API FUNCIONANDO");
    });

    app.use("/funcionarios", funcionariosRoutes);
    app.use("/alocacoes", alocacaoRoutes);
}