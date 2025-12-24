import { UnidadesMedidaRepository } from './unidades.medida.repository'

export class UnidadesMedidaServices {
     private repository = new UnidadesMedidaRepository()

     async listar() {
          return await this.repository.listar()
     }
}