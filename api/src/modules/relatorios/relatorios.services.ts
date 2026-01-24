import { EncomendasResumoMensalRepository } from "./encomendas/encomendas.mensal.repository";

export class RelatoriosServices {
     constructor(
          private encomendasResumoMensal = new EncomendasResumoMensalRepository()
     ){}

     async listarEncomendasResumoMensal(){
          return await this.encomendasResumoMensal.listar()
     }
}