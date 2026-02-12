"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaRequisicao = validaRequisicao;
exports.validaTipoDado = validaTipoDado;
const codigos_resposta_1 = require("../../utils/respostas/codigos-resposta");
const erro_customizado_1 = require("../../types/erro.customizado");
function validaRequisicao(data, dadosNecessarios) {
    const dadosFaltando = dadosNecessarios.filter(d => {
        return data[d] == undefined || data[d] == null;
    });
    if (dadosFaltando.length > 0)
        throw new erro_customizado_1.ErroCustomizado(codigos_resposta_1.CODIGOS_ERRO.DADOS_INCOMPLETOS, { dadosFaltando, dadosNecessarios }, 400);
}
function validaTipoDado(dado, tipo) {
    const tipoReal = Array.isArray(dado) ? 'array' : typeof dado;
    if (tipoReal != tipo)
        throw new erro_customizado_1.ErroCustomizado(codigos_resposta_1.CODIGOS_ERRO.DADO_TIPO_INVALIDO, { tipoEnviado: tipoReal, tipoEsperado: tipo }, 400);
}
//# sourceMappingURL=valida.requisicao.js.map