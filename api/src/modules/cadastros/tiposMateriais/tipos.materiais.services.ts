import { TiposMateriaisRepository } from './tipos.materiais.repository'

export class TiposMateriaisServices {
     private repository = new TiposMateriaisRepository

     async listar() {
          return await this.repository.listar()
     }
}