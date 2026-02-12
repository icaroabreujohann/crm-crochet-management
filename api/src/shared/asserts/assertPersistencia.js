"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertPersistencia = assertPersistencia;
const erro_customizado_1 = require("../../types/erro.customizado");
function assertPersistencia(resultado, codigoErro, valor) {
    if (!resultado) {
        throw new erro_customizado_1.ErroCustomizado(codigoErro, valor);
    }
}
//# sourceMappingURL=assertPersistencia.js.map