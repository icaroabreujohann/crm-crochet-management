"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularDataPrazo = calcularDataPrazo;
const codigos_resposta_1 = require("../respostas/codigos-resposta");
const gerenciador_resposta_1 = require("../respostas/gerenciador-resposta");
function calcularDataPrazo(data_pedido, data_prazo, dias) {
    const pedido = typeof data_pedido === 'string'
        ? new Date(`${data_pedido}T00:00:00`)
        : new Date(data_pedido);
    if (isNaN(pedido.getTime())) {
        gerenciador_resposta_1.gerenciadorMensagens.criarMensagemErro(codigos_resposta_1.CODIGOS_ERRO.DADO_TIPO_INVALIDO, pedido);
    }
    if (data_prazo == null || data_prazo == '') {
        const prazo = new Date(pedido);
        prazo.setDate(prazo.getDate() + dias);
        return String(prazo);
    }
    if (data_prazo) {
        const prazo = typeof data_prazo === 'string'
            ? new Date(`${data_prazo}T00:00:00`)
            : new Date(data_prazo);
        if (isNaN(prazo.getTime())) {
            gerenciador_resposta_1.gerenciadorMensagens.criarMensagemErro(codigos_resposta_1.CODIGOS_ERRO.DADO_TIPO_INVALIDO, prazo);
        }
        return String(prazo);
    }
    return '';
}
//# sourceMappingURL=calcular-data-prazo.js.map