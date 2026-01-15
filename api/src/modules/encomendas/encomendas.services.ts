import { randomUUID } from 'node:crypto'
import { assertResultadoExiste } from '../../shared/asserts/assertResultadoBusca'
import { CODIGOS_ERRO } from '../../utils/respostas/codigos-resposta'
import { EncomendasRepository } from './encomendas.repository'
import { EncomendaMaterialService } from './materiais/encomendaMaterial.services'
import { EncomendaMaterialCriarDTO } from './materiais/encomendaMaterialtypes'
import { EncomendaMaterialRepository } from './materiais/encomendaMaterial.repository'
import { EncomendaCriarDTO } from './encomendas.types'
import { ProdutosRepository } from '../produtos/produtos.repository'
import { ClientesRepository } from '../clientes/clientes.repository'
import { mapEncomendaCriarDTOParaDB } from './encomendas.mapper'
import { assertPersistencia } from '../../shared/asserts/assertPersistencia'

export class EncomendasServices {
     constructor(
          private repository = new EncomendasRepository(),
          private repositoryMateriais = new EncomendaMaterialRepository(),
          private repositoryProdutos = new ProdutosRepository(),
          private repositoryClientes = new ClientesRepository(),
          private servicesMateriais = new EncomendaMaterialService()
     ) { }

     private async gerarCodigoEncomendaUnico(): Promise<string> {
          let codigo: string
          let encomendaExiste

          do {
               codigo = randomUUID()
               encomendaExiste = await this.repository.listarPorCodigo(codigo)
          } while (encomendaExiste.existe)

          return codigo
     }

     private async inserirMateriaisDaEncomenda(encomenda_id: number, materiais: EncomendaMaterialCriarDTO[]): Promise<void> {
          if (!materiais?.length) return

          for (const material of materiais) {
               await this.servicesMateriais.adicionarMaterial(encomenda_id, material)
          }
     }

     private async excluirMateriaisDaEncomenda(produto_id: number): Promise<void> {
          await this.repositoryMateriais.excluirPorEncomenda(produto_id)
     }

     async listar() {
          return await this.repository.listar()
     }

     async listarPorCodigo(codigo: string) {
          const encomenda = await this.repository.listarPorCodigo(codigo)
          assertResultadoExiste(encomenda, CODIGOS_ERRO.ENCOMENDA_N_EXISTE_ERR, codigo)

          return encomenda
     }

     async listarCompleto(codigo: string) {
          const encomenda = await this.repository.listarPorCodigo(codigo)
          assertResultadoExiste(encomenda, CODIGOS_ERRO.ENCOMENDA_N_EXISTE_ERR, codigo)

          const materiais = await this.repositoryMateriais.listarMaterialPorEncomenda(encomenda.data.id)
          const materiaisMapeados = materiais?.data ?? []

          return {
               ...encomenda.data,
               materiais: materiaisMapeados
          }
     }

     async criar(data: EncomendaCriarDTO) {
          const encomendaExiste = await this.repositoryProdutos.listarProdutoPorCodigo(data.produto_codigo)
          assertResultadoExiste(encomendaExiste, CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR, data.produto_codigo)

          const clienteExiste = await this.repositoryClientes.listarPorId(data.cliente_id)
          assertResultadoExiste(clienteExiste, CODIGOS_ERRO.CLIENTE_N_EXISTE_ERR, data.cliente_id)

          const codigo = await this.gerarCodigoEncomendaUnico()
          const encomendaMap = mapEncomendaCriarDTOParaDB(data, codigo, encomendaExiste.data.id)

          const encomendaCriada = await this.repository.criar(encomendaMap)
          assertPersistencia(encomendaCriada, CODIGOS_ERRO.ENCOMENDA_CRIAR_ERR)

          if (data.materiais) await this.inserirMateriaisDaEncomenda(encomendaCriada.id, data.materiais)

          return encomendaCriada
     }
}