import { sql } from "../../config/db";
import { ResultadoBusca } from "../../shared/types";
import { resultadoEncontrado, resultadoInexistente } from '../../utils/resultadoBusca'
import { CriarProdutoDB, EditarProdutoDB, ProdutoDB, ProdutoView } from "./produtos.types";

export class ProdutosRepository {
     private selectProdutoBase = sql`
          select
               p.*,
               pc.categoria as categoria_nome
          from produtos p
          join produtos_categoria pc
               on pc.id = p.categoria_id
     `

     async listar(): Promise<ProdutoDB[]> {
          return await sql`
               ${this.selectProdutoBase}
               order by id desc
          `
     }

     async listarProdutoPorCodigo(codigo: string): Promise<ResultadoBusca<ProdutoDB>> {
          const [produto] = await sql<ProdutoDB[]>`
               ${this.selectProdutoBase}
               where codigo = ${codigo}
               limit 1
          `

          return produto ? resultadoEncontrado(produto) : resultadoInexistente()
     }

     async listarProdutoPorId(id: number): Promise<ResultadoBusca<ProdutoDB>> {
          const [produto] = await sql<ProdutoDB[]>`
               ${this.selectProdutoBase}
               where id = ${id}
               limit 1
          `

          return produto ? resultadoEncontrado(produto) : resultadoInexistente()
     }

     async criar(data: CriarProdutoDB): Promise<ProdutoDB | null> {
          const [produto] = await sql<ProdutoDB[]>`
               insert into produtos(nome, codigo, preco, tempo_medio, fotos_url, categoria_id)
               values(
                    ${data.nome},
                    ${data.codigo},
                    ${data.preco},
                    ${(data.tempo_medio)},
                    ${data.fotos_url},
                    ${data.categoria_id}
               )
               returning *
          `

          return produto ?? null
     }

     async editar(id: number, data: EditarProdutoDB): Promise<ProdutoDB | null> {
          if (!Object.keys(data).length) {
               return null
          }
          const [produto] = await sql<ProdutoDB[]>`
               update produtos
               set
                    ${sql(data)},
                    data_alteracao = now()
               where id = ${id}
               returning *
               `

          return produto ?? null
     }

     async excluir(id: number): Promise<ProdutoDB | null> {
          const [produtoExcluido] = await sql<ProdutoDB[]>`
               delete from produtos
               where id = ${id}
               returning *
          `
          return produtoExcluido ?? null
     }

     async atualizarDataAlteracao(id: number): Promise<void> {
          await sql`
               update produtos
               set data_alteracao = now()
               where id = ${id}
          `
     }
}