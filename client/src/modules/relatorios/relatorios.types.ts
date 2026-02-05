export interface EncomendasResumoMensal {
     mes: string,
     mes_ano: string,
     total_encomendas: number,
     valor_total: number,
     diff_mes_anterior: number,
     perc_mes_anterior: number
}

export interface EncomendasFaturamentoMensal {
     periodo: string,
     faturamento: number,
     custo: number,
     lucro: number
}

export interface ProdutoCategoriaTotal {
     categoria: string
     total: number
     faturamento_total: number
     lucro_total: number
     preco_medio: number
     lucro_medio: number
     margem_lucro_percent: number
}