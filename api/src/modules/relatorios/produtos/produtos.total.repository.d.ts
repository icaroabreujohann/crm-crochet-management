export interface RelatorioCategoria {
    categoria: string;
    total: number;
    faturamento_total: number;
    lucro_total: number;
    preco_medio: number;
    lucro_medio: number;
    margem_lucro_percent: number;
}
export declare class ProdutosTotalRepository {
    listarProdutoCategoria(): Promise<RelatorioCategoria[]>;
}
//# sourceMappingURL=produtos.total.repository.d.ts.map