"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnidadesMedidaRepository = void 0;
const db_1 = require("../../../config/db");
class UnidadesMedidaRepository {
    async listar() {
        return await (0, db_1.sql) `
               select * from unidades_medida
          `;
    }
}
exports.UnidadesMedidaRepository = UnidadesMedidaRepository;
//# sourceMappingURL=unidades.medida.repository.js.map