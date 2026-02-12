"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatoriosServices = void 0;
const encomendas_mensal_repository_1 = require("./encomendas/encomendas.mensal.repository");
const produtos_total_repository_1 = require("./produtos/produtos.total.repository");
class RelatoriosServices {
    encomendasMensal;
    produtosTotal;
    constructor(encomendasMensal = new encomendas_mensal_repository_1.EncomendasMensalRepository(), produtosTotal = new produtos_total_repository_1.ProdutosTotalRepository()) {
        this.encomendasMensal = encomendasMensal;
        this.produtosTotal = produtosTotal;
    }
    async listarEncomendasResumoMensal() {
        return await this.encomendasMensal.listarResumo();
    }
    async listarEncomendasFaturamentoMensal() {
        return await this.encomendasMensal.listarFaturamento();
    }
    async listarProdutoCategoria() {
        return await this.produtosTotal.listarProdutoCategoria();
    }
}
exports.RelatoriosServices = RelatoriosServices;
//# sourceMappingURL=relatorios.services.js.map