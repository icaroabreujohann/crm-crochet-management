import { sql } from '../../../config/db'
import { assertResultadoExiste } from '../../../shared/asserts/assertResultadoBusca';
import { ResultadoBusca } from '../../../shared/types';
import { resultadoEncontrado, resultadoInexistente } from '../../../utils/resultadoBusca';
import { ProdutoDB } from '../../produtos/produtos.types';
import { ProdutoCategoria, ProdutoCategoriaCriarDB, ProdutoCategoriaEditarDB } from './produtos.categorias.types';

export class ProdutoCategoriaRepository {
     async listar(): Promise<ProdutoCategoria[]> {
          return await sql<ProdutoCategoria[]>`
               select * from produtos_categoria
          `
     }


     async listarCategoriaPorId(id: number): Promise<ResultadoBusca<ProdutoCategoria>> {
          const [categoria] = await sql<ProdutoCategoria[]>`
               select * from produtos_categoria
               where id = ${id}
          `

          return categoria ? resultadoEncontrado(categoria) : resultadoInexistente()
     }

     async listarCategoriaUtilizada(id: number): Promise<ResultadoBusca<ProdutoDB>> {
          const [produto] = await sql<ProdutoDB[]>`
               select * from produtos
               where categoria_id = ${id}
          `
          return produto ? resultadoEncontrado(produto) : resultadoInexistente()
     }

     async criar(data: ProdutoCategoriaCriarDB): Promise<ProdutoCategoria | null> {
          const [categoriaCriada] = await sql<ProdutoCategoria[]>`
               insert into produtos_categoria (categoria)
               values (${data.categoria})
               returning *
          `
          return categoriaCriada ?? null
     }

     async editar(data: ProdutoCategoriaEditarDB): Promise<ProdutoCategoria | null> {
          const [categoriaEditada] = await sql<ProdutoCategoria[]>`
               update produtos_categoria
               set categoria = ${data.categoria}
               where id = ${data.id}
               returning *
          `
          return categoriaEditada ?? null
     }

     async excluir(id: number): Promise<ProdutoCategoria | null> {
          const [categoriaExcluida] = await sql<ProdutoCategoria[]>`
               delete from produtos_categoria
               where id = ${id}
               returning *
          `
          return categoriaExcluida ?? null
     }
}