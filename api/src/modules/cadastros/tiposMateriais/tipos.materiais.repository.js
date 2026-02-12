"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposMateriaisRepository = void 0;
const db_1 = require("../../../config/db");
class TiposMateriaisRepository {
    async listar() {
        return await (0, db_1.sql) `
               select * from materiais_tipos
          `;
    }
}
exports.TiposMateriaisRepository = TiposMateriaisRepository;
//# sourceMappingURL=tipos.materiais.repository.js.map