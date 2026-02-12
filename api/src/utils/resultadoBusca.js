"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultadoInexistente = resultadoInexistente;
exports.resultadoEncontrado = resultadoEncontrado;
function resultadoInexistente() {
    return {
        existe: false,
        data: null
    };
}
function resultadoEncontrado(data) {
    return {
        existe: true,
        data
    };
}
//# sourceMappingURL=resultadoBusca.js.map