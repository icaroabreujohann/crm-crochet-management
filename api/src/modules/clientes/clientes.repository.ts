import { sql } from '../../config/db'
import { Cliente, ClienteId, CriarClienteDTO, EditarClienteDTO } from '../../types/cliente'
import { verificaResultadoExiste } from '../../types/verifica.resultado.existe'
import { normalizaTexto } from '../../utils/normalizaTexto'

export class ClientesRepository {

     async listar(): Promise<Cliente[]> {
          return await sql`select * from clientes order by id desc`
     }

     async listarPorId(id: number): Promise<Cliente | null> {
          const [cliente] = await sql<Cliente[]>`
               select * from clientes
               where id = ${id}
               limit 1

               `
          return cliente ?? null
     }

     async criar(data: CriarClienteDTO): Promise<Cliente | null> {
          const [clienteNovo] = await sql<Cliente[]>`
          insert into clientes (nome, instagram, telefone)
          values (
               ${data.nome},
               ${normalizaTexto(data.instagram)},
               ${normalizaTexto(data.telefone)}
          )
          returning *
     `
          return clienteNovo ?? null
     }

     async editar(id: number, data: EditarClienteDTO): Promise<Cliente | null> {
          const [clienteAtualizado] = await sql<Cliente[]>`
          update clientes
          set 
               nome = ${data.nome},
               instagram = ${normalizaTexto(data.instagram)},
               telefone = ${normalizaTexto(data.telefone)}
          where
               id = ${id}
          returning *
     `
          return clienteAtualizado ?? null
     }

     async excluir(id: number): Promise<Cliente | null> {
          const [clienteExcluido] = await sql<Cliente[]>`
          delete from clientes
          where id = ${id}
          returning *
     `
          return clienteExcluido ?? null
     }

     //Validações

     async obterClientePorInstagram(instagram: string): Promise<verificaResultadoExiste<ClienteId>> {
          const [cliente] = await sql<ClienteId[]>`
               select id from clientes
               where instagram = ${instagram}
          `
          return {
               existe: !!cliente,
               data: cliente ?? null,
               campo: 'Instagram',
          }
     }

     async obterClientePorTelefone(telefone: string): Promise<verificaResultadoExiste<ClienteId>> {
          const [cliente] = await sql<ClienteId[]>`
               select id from clientes
               where telefone = ${telefone}
          `
          return {
               existe: !!cliente,
               data: cliente ?? null,
               campo: 'Telefone',
          }
     }

     async obterClientePorId(id: number): Promise<verificaResultadoExiste<Cliente>> {
          const [cliente] = await sql<Cliente[]>`
               select * from clientes
               where id = ${id}
          `

          return {
               existe: !!cliente,
               data: cliente ?? null,
               campo: 'ID',
          }
     }
}
