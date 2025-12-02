import { sql } from "../../config/db";
import { CriarProdutoDTO, EditarProdutoDTO, Produto } from "../../types/produtos";
import { verificaResultadoExiste } from "../../types/verifica.resultado.existe";

export class ProdutosRepository {
     async listar(): Promise<Produto[]> {
          return await sql`select * from produtos`
     }

     async listarPorId(id: number): Promise<Produto> {
          const [produto] = await sql<Produto[]>`
               select * from produtos
               where id = ${id}
               limit 1
          `
          if (!produto) throw new Error('Erro ao listar produto')
          return produto
     }

     async criar(data: CriarProdutoDTO): Promise<Produto> {
          const [produto] = await sql<Produto[]>`
               insert into produtos(nome, codigo, preco, tempo_medio, fotos_url)
               values(
                    ${data.nome},
                    ${data.codigo},
                    ${data.preco},
                    ${data.tempo_medio},
                    ${data.fotos_url}
               )
               returning *
          `
          if (!produto) throw new Error('Erro ao criar produto')
          return produto
     }

     async editar(id: number, data: EditarProdutoDTO): Promise<Produto> {
          const [produto] = await sql<Produto[]>`
               update produtos
               set
                    nome        = coalesce(${data.nome}, nome),
                    preco       = coalesce(${data.preco}, preco),
                    tempo_medio = coalesce(${data.tempo_medio}, tempo_medio),
                    fotos_url   = coalesce(${data.fotos_url}, fotos_url),
                    data_alteracao = now()
               where id = ${id}
               returning *
               `

          if (!produto) throw new Error('Produto não encontrado')

          return produto
     }

     async excluir(id: number): Promise<Produto> {
          const [produtoExcluido] = await sql<Produto[]>`
               delete from produtos
               where id = ${id}
               returning *
          `
          if (!produtoExcluido) throw new Error('Falha ao excluir produto')
          return produtoExcluido
     }

     //

     async obterProdutoPorCodigo(codigo: string): Promise<verificaResultadoExiste<Produto>> {
          const [produto] = await sql<Produto[]>`
                    select * from produtos
                    where codigo = ${codigo}
               `
          return {
               existe: !!produto,
               data: produto ?? null,
               campo: 'codigo',
          }
     }
}