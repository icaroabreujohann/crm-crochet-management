import { Cliente, CriarClienteDTO, EditarClienteDTO } from '../../types/cliente'
import { verificaErroExiste } from '../../utils/verifcaErroExiste'
import { ClientesRepository } from '../clientes/clientes.repository'

export class ClientesService {
     private repository = new ClientesRepository()

     async listarClientes() {
          return await this.repository.listar()
     }

     async listarClientePorId(id: number) {
          const cliente = await this.repository.listarPorId(id)
          console.log(cliente)
     }

     async criarCliente(data: CriarClienteDTO){
          return await this.repository.criar(data)
     }

     async editarCliente(data: EditarClienteDTO){
          return await this.repository.editar(data)
     }

     async excluirCliente(id: number) {
          return await this.repository.excluir(id)
     }
}