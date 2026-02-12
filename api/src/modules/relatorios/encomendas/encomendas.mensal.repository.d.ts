export interface EncomendasResumoMensal {
    mes: string;
    mes_ano: string;
    total_encomendas: number;
    valor_total: number;
    diff_mes_anterior: number;
    perc_mes_anterior: number;
}
export interface EncomendasLucroMensal {
    periodo: string;
    faturamento: number;
    custo: number;
    lucro: number;
}
export declare class EncomendasMensalRepository {
    listarResumo(): Promise<EncomendasResumoMensal[]>;
    listarFaturamento(): Promise<EncomendasLucroMensal[]>;
}
//# sourceMappingURL=encomendas.mensal.repository.d.ts.map