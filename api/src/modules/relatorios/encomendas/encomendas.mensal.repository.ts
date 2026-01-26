import { sql } from '../../../config/db'

export interface EncomendasResumoMensal {
     mes: string,
     mes_ano: string,
     total_encomendas: number,
     valor_total: number,
     diff_mes_anterior: number,
     perc_mes_anterior: number
}

export class EncomendasResumoMensalRepository {
          async listar(): Promise<EncomendasResumoMensal[]> {
               const relatorio = sql<EncomendasResumoMensal[]>`
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
               `
               return relatorio
          }
}