"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoMaterialRepository = void 0;
const db_1 = require("../../../config/db");
const resultadoBusca_1 = require("../../../utils/resultadoBusca");
class ProdutoMaterialRepository {
    async listarMaterialPorProduto(produto_id) {
        const materiais = await (0, db_1.sql) `
               select
                    pm.*,
                    m.codigo as codigo,
                    m.nome as material_nome,
                    m.preco_x_qtd as material_preco_x_qtd,
                    um.sigla as material_unidade_medida_sigla,
                    mt.nome as material_tipo_nome
               from
                    produtos_materiais pm
               join materiais m
                    on m.id = pm.material_id
               join unidades_medida um
                    on um.id = m.unidade_medida_id
               join materiais_tipos mt
                    on mt.id = m.tipo_id
               where pm.produto_id = ${produto_id}
          `;
        return materiais ? (0, resultadoBusca_1.resultadoEncontrado)(materiais) : (0, resultadoBusca_1.resultadoInexistente)();
    }
    async criar(data) {
        const [material] = await (0, db_1.sql) `
          insert into produtos_materiais (produto_id,material_id,quantidade,preco_final)
          values (
               ${data.produto_id},
               ${data.material_id},
               ${data.quantidade},
               ${data.preco_final}
          )
          returning *
     `;
        return material ?? null;
    }
    async excluirPorProduto(produto_id) {
        const [materiaisExcluidos] = await (0, db_1.sql) `
               delete from produtos_materiais
               where produto_id = ${produto_id}
          `;
    }
}
exports.ProdutoMaterialRepository = ProdutoMaterialRepository;
//# sourceMappingURL=produtoMaterial.repository.js.map