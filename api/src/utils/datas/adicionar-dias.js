"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adicionarDias = adicionarDias;
function adicionarDias(data, dias) {
    const novaData = new Date(data);
    novaData.setDate(novaData.getDate() + dias);
    return novaData;
}
//# sourceMappingURL=adicionar-dias.js.map