"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizaTexto = normalizaTexto;
exports.normalizaUndefined = normalizaUndefined;
exports.normalizaData = normalizaData;
function normalizaTexto(valor) {
    if (!valor)
        return null;
    const texto = valor.trim();
    return texto === '' ? null : texto;
}
function normalizaUndefined(v) {
    return v ?? null;
}
function normalizaData(valor) {
    if (!valor || valor === '')
        return null;
    return typeof valor === 'string' ? new Date(valor) : valor;
}
//# sourceMappingURL=normalizadores.js.map