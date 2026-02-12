"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertResultadoExiste = assertResultadoExiste;
exports.assertResultadoNaoExiste = assertResultadoNaoExiste;
const erro_customizado_1 = require("../../types/erro.customizado");
function assertResultadoExiste(resultado, codigoErro, valor) {
    if (!resultado.existe) {
        throw new erro_customizado_1.ErroCustomizado(codigoErro, valor);
    }
}
function assertResultadoNaoExiste(resultado, codigoErro, valor) {
    if (resultado.existe) {
        throw new erro_customizado_1.ErroCustomizado(codigoErro, valor);
    }
}
//# sourceMappingURL=assertResultadoBusca.js.map