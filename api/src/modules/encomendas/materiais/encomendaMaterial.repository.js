"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncomendaMaterialRepository = void 0;
const db_1 = require("../../../config/db");
const resultadoBusca_1 = require("../../../utils/resultadoBusca");
class EncomendaMaterialRepository {
    async listarMaterialPorEncomenda(encomenda_id) {
        const materiais = await (0, db_1.sql) `
               select
                    em.*,
                    m.codigo as codigo,
                    m.nome as material_nome,
                    m.preco_x_qtd as material_preco_x_qtd,
                    um.sigla as material_unidade_medida_sigla,
                    mt.nome as material_tipo_nome
               from
                    encomendas_materiais em
               join materiais m
                    on m.id = em.material_id
               join unidades_medida um
                    on um.id = m.unidade_medida_id
               join materiais_tipos mt
                    on mt.id = m.tipo_id
               where em.encomenda_id = ${encomenda_id}
          `;
        return materiais ? (0, resultadoBusca_1.resultadoEncontrado)(materiais) : (0, resultadoBusca_1.resultadoInexistente)();
    }
    async criar(data) {
        const [material] = await (0, db_1.sql) `
          insert into encomendas_materiais (encomenda_id,material_id,quantidade,preco_final)
          values (
               ${data.encomenda_id},
               ${data.material_id},
               ${data.quantidade},
               ${data.preco_final}
          )
          returning *
     `;
        return material ?? null;
    }
    async excluirPorEncomenda(encomenda_id) {
        const [materiaisExcluidos] = await (0, db_1.sql) `
               delete from encomendas_materiais
               where encomenda_id = ${encomenda_id}
          `;
    }
}
exports.EncomendaMaterialRepository = EncomendaMaterialRepository;
//# sourceMappingURL=encomendaMaterial.repository.js.map