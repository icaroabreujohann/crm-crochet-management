"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerenciadorMensagens = void 0;
class GerenciadorMensagens {
    _criarResposta(sucesso, definidoPeloSistema, codigoResposta, codigoStatus, data = null) {
        return {
            sucesso: sucesso,
            mensagem: codigoResposta.mensagem,
            codigo: codigoResposta.codigo,
            data,
            definidoPeloSistema: definidoPeloSistema,
            codigoStatus: codigoStatus ?? (sucesso ? 200 : 400)
        };
    }
    criarMensagemSucesso(codigoResposta, data = null) {
        return this._criarResposta(true, true, codigoResposta, 200, data);
    }
    criarMensagemErro(codigoResposta, data = null) {
        return this._criarResposta(false, true, codigoResposta, 400, data);
    }
    enviarMensagemSucesso(res, status, codigoResposta, data = null) {
        res.status(status).json(this.criarMensagemSucesso(codigoResposta, data));
    }
    enviarMensagemErro(res, status, codigoResposta, data = null) {
        res.status(status).json(this.criarMensagemErro(codigoResposta, data));
    }
}
exports.gerenciadorMensagens = new GerenciadorMensagens();
//# sourceMappingURL=gerenciador-resposta.js.map