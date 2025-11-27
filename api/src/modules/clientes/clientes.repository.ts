import { sql } from '../../config/db'
import { Cliente, ClienteId, CriarClienteDTO, EditarClienteDTO } from '../../types/cliente'
import { verificaResultadoExiste } from '../../types/verifica.resultado.existe'
import { normalizaTexto } from '../../utils/normalizaTexto'

export class ClientesRepository {

     async listar(): Promise<Cliente[]> {
          return await sql`select * from clientes order by id desc`
     }

     async listarPorId(id: number): Promise<Cliente[]> {
          return await sql`
          select * from clientes
          where id = ${id}
     `
     }

     async criar(data: CriarClienteDTO): Promise<Cliente> {
          const [clienteNovo] = await sql<Cliente[]>`
          insert into clientes (nome, instagram, telefone)
          values (
               ${data.nome},
               ${normalizaTexto(data.instagram)},
               ${normalizaTexto(data.telefone)}
          )
          returning *
     `
          if (!clienteNovo) throw new Error('Falha ao criar cliente')
          return clienteNovo
     }

     async editar(id: number, data: EditarClienteDTO): Promise<Cliente> {
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
          if (!clienteAtualizado) throw new Error('Falha ao editar cliente')
          return clienteAtualizado
     }

     async excluir(id: number): Promise<Cliente> {
          const [clienteExcluido] = await sql<Cliente[]>`
          delete from clientes
          where id = ${id}
          returning *
     `
          if (!clienteExcluido) throw new Error('Falha ao excluir cliente')
          return clienteExcluido
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
}
