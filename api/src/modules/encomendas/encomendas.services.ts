import { CriarEncomendaDTO, EditarEncomendaDTO } from "../../types/encomenda"
import { EncomendasRepository } from "./encomendas.repository"
import { ClientesRepository } from "../clientes/clientes.repository"
import { verificaErroExiste } from "../../utils/verifcaErroExiste"
import { CODIGOS_ERRO } from "../../utils/codigosRespostas"

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
          const [clienteExisteId] = await Promise.all([
               this.clientesRepository.obterClientePorId(data.clienteId)
          ])

          verificaErroExiste([
               { condicao: !clienteExisteId.existe, valor: data.clienteId, codigoResposta: CODIGOS_ERRO.CLIENTE_N_EXISTE_ERR }
          ])

          data.clienteNome = clienteExisteId.data?.nome ?? null
          return await this.repository.criarEncomenda(data)
     }

     async editarEncomenda(id: number, data: EditarEncomendaDTO) {
          const [encomendaExisteId] = await Promise.all([
               this.repository.obterEncomendaPeloId(id),
          ])

          verificaErroExiste([
               { condicao: !encomendaExisteId.existe, valor: id, codigoResposta: CODIGOS_ERRO.ENCOMENDA_N_EXISTE_ERR }
          ])

          return await this.repository.editarEncomenda(id, data)
     }

     async excluirEncomenda(id: number) {
          const [encomendaExisteId] = await Promise.all([
               this.repository.obterEncomendaPeloId(id),
          ])

          verificaErroExiste([
               { condicao: !encomendaExisteId.existe, valor: id, codigoResposta: CODIGOS_ERRO.ENCOMENDA_N_EXISTE_ERR }
          ])

          return await this.repository.excluirEncomenda(id)
     }
}