"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErroCustomizado = void 0;
class ErroCustomizado extends Error {
    definidoPeloSistema;
    codigoResposta;
    data;
    codigoStatus;
    constructor(codigoResposta, data, codigoStatus) {
        super(codigoResposta.mensagem);
        this.definidoPeloSistema = true;
        this.codigoResposta = codigoResposta;
        this.data = data ?? null;
        this.codigoStatus = codigoStatus ?? 400;
    }
}
exports.ErroCustomizado = ErroCustomizado;
//# sourceMappingURL=erro.customizado.js.map