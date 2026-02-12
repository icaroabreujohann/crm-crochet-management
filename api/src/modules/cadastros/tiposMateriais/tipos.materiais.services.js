"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposMateriaisServices = void 0;
const tipos_materiais_repository_1 = require("./tipos.materiais.repository");
class TiposMateriaisServices {
    repository = new tipos_materiais_repository_1.TiposMateriaisRepository;
    async listar() {
        return await this.repository.listar();
    }
}
exports.TiposMateriaisServices = TiposMateriaisServices;
//# sourceMappingURL=tipos.materiais.services.js.map