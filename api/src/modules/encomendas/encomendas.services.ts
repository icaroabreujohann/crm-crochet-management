import { CriarEncomendaDTO } from "../../types/encomenda"
import { EncomendasRepository } from "./encomendas.repository"

export class EncomendasServices {
     private repository = new EncomendasRepository()

     async listar() {
          return await this.repository.listar()
     }

     async listarPorId(id: number) {
          return await this.repository.listarPorId(id)
     }

     async criarEncomenda(data: CriarEncomendaDTO) {
          console.log(data)
     }
}