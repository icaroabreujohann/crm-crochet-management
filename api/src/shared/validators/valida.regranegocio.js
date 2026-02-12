"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaRegraNegocio = validaRegraNegocio;
const erro_customizado_1 = require("../../types/erro.customizado");
function validaRegraNegocio(regras) {
    const erro = regras.find(v => v.condicao);
    if (erro)
        throw new erro_customizado_1.ErroCustomizado(erro.codigoResposta, erro.valor);
}
//# sourceMappingURL=valida.regranegocio.js.map