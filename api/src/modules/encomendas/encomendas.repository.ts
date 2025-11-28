import { sql } from '../../config/db'
import { ErroCustomizado } from '../../errors/erro.customizado'
import { Encomenda, CriarEncomendaDTO, EditarEncomendaDTO } from '../../types/encomenda'
import { verificaResultadoExiste } from '../../types/verifica.resultado.existe'
import { CODIGOS_ERRO } from '../../utils/codigosRespostas'
import { normalizaTexto } from '../../utils/normalizaTexto'

export class EncomendasRepository {
     async listar(): Promise<Encomenda[]> {
          return await sql`
               select * from encomendas
               order by id desc
          `
     }

     async listarPorId(id: number): Promise<Encomenda[]> {
          return await sql`
               select * from encomendas
               where id = ${id}
          `
     }

     async criarEncomenda(data: CriarEncomendaDTO): Promise<Encomenda> {

          const [encomendaNova] = await sql<Encomenda[]>`
               insert into encomendas (titulo, cliente_id, cliente_nome, notas, preco_total, data_prazo, data_entrega)
               values(
                    ${data.titulo},
                    ${data.clienteId},
                    ${data.clienteNome},
                    ${data.notas},
                    ${data.precoTotal},
                    ${data.dataPrazo},
                    ${data.dataEntrega},
               )
               returning *
          `
          if (!encomendaNova) throw new ErroCustomizado(CODIGOS_ERRO.ENCOMENDA_CRIAR_ERR, 400)
          return encomendaNova
     }

     async editarEncomenda(id: number, data: EditarEncomendaDTO): Promise<Encomenda> {
          const [encomendaEditada] = await sql<Encomenda[]>`
               update encomendas
                    titulo = ${data.titulo},
                    cliente_id = ${data.clienteId},
                    cliente_nome = ${data.clienteNome},
                    notas = ${data.notas},
                    preco_total = ${data.precoTotal},
                    data_prazo = ${data.dataPrazo},
                    data_entrega = ${data.dataEntrega}
               where id = ${id}

               returning*
          `

          if (!encomendaEditada) throw new ErroCustomizado(CODIGOS_ERRO.ENCOMENDA_EDITAR_ERR, 400)
          return encomendaEditada
     }

     async excluirEncomenda(id: number): Promise<Encomenda> {
          const [encomendaExcluida] = await sql<Encomenda[]>`
               delete from encomendas
               where id = ${id}

               returning *
          `
          if (!encomendaExcluida) throw new ErroCustomizado(CODIGOS_ERRO.ENCOMENDA_EXCLUIR_ERR, 400)
          return encomendaExcluida
     }

     //Validações

     async obterEncomendaPeloId(id: number): Promise<verificaResultadoExiste<Encomenda>> {
          const [encomenda] = await sql<Encomenda[]>`
               select * from encomendas
               where id = ${id}
          `
          return {
               existe: !!encomenda,
               data: encomenda ?? null,
               campo: 'ID',
          }
     }
}