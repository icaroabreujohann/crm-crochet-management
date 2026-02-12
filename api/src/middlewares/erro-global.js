"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.erroGlobal = void 0;
const codigos_resposta_1 = require("../utils/respostas/codigos-resposta");
const gerenciador_resposta_1 = require("../utils/respostas/gerenciador-resposta");
const erroGlobal = (err, req, res, next) => {
    console.log(err);
    if (err.definidoPeloSistema) {
        return gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemErro(res, err.codigoStatus ?? 400, err.codigoResposta, err.data);
    }
    return gerenciador_resposta_1.gerenciadorMensagens.enviarMensagemErro(res, 500, codigos_resposta_1.CODIGOS_ERRO.ERRO_INTERNO, err);
};
exports.erroGlobal = erroGlobal;
//# sourceMappingURL=erro-global.js.map