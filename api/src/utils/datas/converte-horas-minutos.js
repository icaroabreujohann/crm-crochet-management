"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converteMinutosParaHoras = converteMinutosParaHoras;
exports.converteHorasParaMinutos = converteHorasParaMinutos;
const erro_customizado_1 = require("../../types/erro.customizado");
const codigos_resposta_1 = require("../respostas/codigos-resposta");
function converteMinutosParaHoras(minutosTotais) {
    if (!Number.isInteger(minutosTotais) || minutosTotais < 0) {
        throw new erro_customizado_1.ErroCustomizado(codigos_resposta_1.CODIGOS_ERRO.MINUTOS_INVALIDOS, minutosTotais, 400);
    }
    const horas = Math.floor(minutosTotais / 60);
    const minutos = minutosTotais % 60;
    return { horas, minutos };
}
function converteHorasParaMinutos(horas, minutos) {
    if (!Number.isInteger(horas) || horas < 0) {
        throw new erro_customizado_1.ErroCustomizado(codigos_resposta_1.CODIGOS_ERRO.HORAS_INVALIDAS, horas, 400);
    }
    if (!Number.isInteger(minutos) || minutos < 0 || minutos > 59) {
        throw new erro_customizado_1.ErroCustomizado(codigos_resposta_1.CODIGOS_ERRO.MINUTOS_INVALIDOS, minutos, 400);
    }
    return horas * 60 + minutos;
}
//# sourceMappingURL=converte-horas-minutos.js.map