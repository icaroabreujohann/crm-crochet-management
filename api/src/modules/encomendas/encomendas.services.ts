import { CriarEncomendaDTO } from "../../types/encomenda"
import { EncomendasRepository } from "./encomendas.repository"
import { ClientesRepository } from "../clientes/clientes.repository"

export class EncomendasServices {
     private repository = new EncomendasRepository()
     private clientesRepository = new ClientesRepository()

     async listar() {
          return await this.repository.listar()
     }

     async listarPorId(id: number) {
          return await this.repository.listarPorId(id)
     }

     async criarEncomenda(data: CriarEncomendaDTO) {
          const clienteNome = await this.clientesRepository.listarPorId(data.clienteId)

          data.clienteNome = clienteNome.nome
          return data
     }
}