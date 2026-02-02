import { EncomendasMensalRepository } from "./encomendas/encomendas.mensal.repository";

export class RelatoriosServices {
     constructor(
          private encomendasMensal = new EncomendasMensalRepository
     ){}

     async listarEncomendasResumoMensal(){
          return await this.encomendasMensal.listarResumo()
     }

     async listarEncomendasFaturamentoMensal() {
          return await this.encomendasMensal.listarFaturamento()
     }
}