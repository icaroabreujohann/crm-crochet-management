"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncomendasMensalRepository = void 0;
const db_1 = require("../../../config/db");
class EncomendasMensalRepository {
    async listarResumo() {
        const relatorio = await (0, db_1.sql) `
                    with base as (
                    select
                         date_trunc('month', e.data_pedido) as mes,
                         count(*) as total_encomendas,
                         sum(p.preco) as valor_total
                    from encomendas e
                    join produtos p on p.id = e.produto_id
                    group by mes
                    )
                    select
                    mes,
                    to_char(mes, 'MM/YYYY') as mes_ano,
                    total_encomendas,
                    valor_total,
                    total_encomendas
                         - lag(total_encomendas) over (order by mes) as diff_mes_anterior,
                    round(
                         (
                              (total_encomendas - lag(total_encomendas) over (order by mes))
                              / nullif(lag(total_encomendas) over (order by mes), 0)::numeric
                         ) * 100,
                         2
                    ) as perc_mes_anterior
                    from base
                    order by mes
               `;
        return relatorio;
    }
    async listarFaturamento() {
        const relatorio = await (0, db_1.sql) `
               with faturamento as (
               select
                    date_trunc('month', e.data_prazo)::date as periodo,
                    sum(p.preco) as faturamento
               from encomendas e
               join produtos p
                    on p.id = e.produto_id
               where 
                         e.data_prazo is not null 
                    and  e.finalizado = true
               group by
                    date_trunc('month', e.data_prazo)::date
               ),
               custo as (
               select
                    date_trunc('month', e.data_prazo)::date as periodo,
                    coalesce(sum(em.preco_final), 0) as custo
               from encomendas e
               left join encomendas_materiais em
                    on em.encomenda_id = e.id
               where 
                         e.data_prazo is not null 
                    and  e.finalizado = true
               group by
                    date_trunc('month', e.data_prazo)::date
               )
               select
                    f.periodo,
                    f.faturamento,
                    g.custo,
                    f.faturamento - g.custo as lucro
               from faturamento f
               left join custo g
                    on g.periodo = f.periodo
               order by
                    f.periodo
               `;
        return relatorio;
    }
}
exports.EncomendasMensalRepository = EncomendasMensalRepository;
//# sourceMappingURL=encomendas.mensal.repository.js.map