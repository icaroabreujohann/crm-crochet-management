"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutosTotalRepository = void 0;
const db_1 = require("../../../config/db");
class ProdutosTotalRepository {
    async listarProdutoCategoria() {
        const relatorio = await (0, db_1.sql) `
               with custo_por_produto as (
               select
                    p.id as produto_id,
                    coalesce(sum(pm.quantidade * m.preco_x_qtd), 0) as custo
               from produtos p
                    left join produtos_materiais pm 
                         on pm.produto_id = p.id
                    left join materiais m 
                         on m.id = pm.material_id
               group by p.id
               )
               select
                    pc.categoria,
                    count(*) as total_vendas,
                    sum(p.preco) as faturamento_total,
                    round(sum(p.preco) - sum(cpp.custo), 2) as lucro_total,
                    round(sum(p.preco) / count(*), 2) as preco_medio,
                    round((sum(p.preco) - sum(cpp.custo)) / count(*), 2) as lucro_medio,
                    round(avg((p.preco - cpp.custo) / p.preco * 100), 0) as margem_lucro_percent
               from encomendas e
               join produtos p 
                    on p.id = e.produto_id
               join produtos_categoria pc 
                    on pc.id = p.categoria_id
               left join custo_por_produto cpp 
                    on cpp.produto_id = p.id
               group by pc.categoria
               order by total_vendas desc
          `;
        return relatorio;
    }
}
exports.ProdutosTotalRepository = ProdutosTotalRepository;
//# sourceMappingURL=produtos.total.repository.js.map