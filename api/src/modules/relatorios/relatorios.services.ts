import { EncomendasMensalRepository } from "./encomendas/encomendas.mensal.repository";
import { ProdutosTotalRepository } from "./produtos/produtos.total.repository";

export class RelatoriosServices {
     constructor(
          private encomendasMensal = new EncomendasMensalRepository(),
          private produtosTotal = new ProdutosTotalRepository()
     ){}

     async listarEncomendasResumoMensal(){
          return await this.encomendasMensal.listarResumo()
     }

     async listarEncomendasFaturamentoMensal() {
          return await this.encomendasMensal.listarFaturamento()
     }

     async listarProdutoCategoria() {
          return await this.produtosTotal.listarProdutoCategoria()
     }
}