import { sql } from '../../../config/db'

export interface EncomendasResumoMensal {
     mes_ano: string,
     total_encomendas: number,
     valor_total: number,
     diff_mes_anterior: number
}

export class EncomendasResumoMensalRepository {
          async listar(): Promise<EncomendasResumoMensal[]> {
               const relatorio = sql<EncomendasResumoMensal[]>`
                    select
                         to_char(e.data_pedido, 'MM/YYYY') AS mes_ano,
                         count(e.*) as total_encomendas,
                         sum(p.preco) as valor_total,
	                    count(e.*) - lag(count(e.*)) over (order by min(e.data_pedido)) as diff_mes_anterior
                    from encomendas e
                    join produtos p
                         on p.id = e.produto_id
                    group by mes_ano
                    order by mes_ano asc
               `
               return relatorio
          }
}