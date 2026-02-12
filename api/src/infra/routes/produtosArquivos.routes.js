"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
const paths_1 = require("../upload/paths");
const gerenciador_resposta_1 = require("../../utils/respostas/gerenciador-resposta");
const codigos_resposta_1 = require("../../utils/respostas/codigos-resposta");
router.get('/:codigo', (req, res) => {
    const dir = path_1.default.join(paths_1.PRODUTOS_DIR, req.params.codigo);
    if (!fs_1.default.existsSync(dir))
        return res.json([]);
    const arquivos = fs_1.default.readdirSync(dir);
    const urls = arquivos.map(nome => `${req.protocol}://${req.get('host')}/arquivos/produtos/${req.params.codigo}/${nome}`);
    gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemSucesso(res, 200, codigos_resposta_1.CODIGOS_SUCESSO.PRODUTO_LISTAR_FOTOS_SUCESS, urls);
});
router.get('/:codigo/:arquivo', (req, res) => {
    const filePath = path_1.default.join(paths_1.PRODUTOS_DIR, req.params.codigo, req.params.arquivo);
    if (!fs_1.default.existsSync(filePath))
        return res.status(404).send('Arquivo não encontrado');
    res.sendFile(filePath);
});
exports.default = router;
//# sourceMappingURL=produtosArquivos.routes.js.map