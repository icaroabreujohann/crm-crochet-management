import { EncomendasMensalRepository } from "./encomendas/encomendas.mensal.repository";
import { ProdutosTotalRepository } from "./produtos/produtos.total.repository";
export declare class RelatoriosServices {
    private encomendasMensal;
    private produtosTotal;
    constructor(encomendasMensal?: EncomendasMensalRepository, produtosTotal?: ProdutosTotalRepository);
    listarEncomendasResumoMensal(): Promise<import("./encomendas/encomendas.mensal.repository").EncomendasResumoMensal[]>;
    listarEncomendasFaturamentoMensal(): Promise<import("./encomendas/encomendas.mensal.repository").EncomendasLucroMensal[]>;
    listarProdutoCategoria(): Promise<import("./produtos/produtos.total.repository").RelatorioCategoria[]>;
}
//# sourceMappingURL=relatorios.services.d.ts.map