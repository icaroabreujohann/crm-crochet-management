"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnidadesMedidaServices = void 0;
const unidades_medida_repository_1 = require("./unidades.medida.repository");
class UnidadesMedidaServices {
    repository = new unidades_medida_repository_1.UnidadesMedidaRepository();
    async listar() {
        return await this.repository.listar();
    }
}
exports.UnidadesMedidaServices = UnidadesMedidaServices;
//# sourceMappingURL=unidades.medida.services.js.map