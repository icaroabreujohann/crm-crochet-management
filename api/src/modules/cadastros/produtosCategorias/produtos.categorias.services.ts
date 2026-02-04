import { ProdutoCategoriaRepository } from './produtos.categorias.repository'
import { ProdutoCategoriaCriarDTO, ProdutoCategoriaEditarDTO } from './produtos.categorias.types'
import { CODIGOS_ERRO } from '../../../utils/respostas/codigos-resposta'
import { assertPersistencia } from '../../../shared/asserts/assertPersistencia'
import { assertResultadoExiste, assertResultadoNaoExiste } from '../../../shared/asserts/assertResultadoBusca'

export class ProdutoCategoriaServices {
     constructor(
          private repository = new ProdutoCategoriaRepository()
     ) { }

     async listar() {
          const categorias = await this.repository.listar()
          return categorias
     }

     async criar(data: ProdutoCategoriaCriarDTO) {
          const categoriaCriada = await this.repository.criar(data)
          assertPersistencia(categoriaCriada, CODIGOS_ERRO.PRODUTO_CATEGORIA_CRIAR_ERR)

          return categoriaCriada
     }

     async editar(data: ProdutoCategoriaEditarDTO) {
          const categoriaExiste = await this.repository.listarCategoriaPorId(data.id)
          assertResultadoExiste(categoriaExiste, CODIGOS_ERRO.PRODUTO_CATEGORIA_N_EXISTE)

          const categoriaEditada = await this.repository.editar(data)
          assertPersistencia(categoriaEditada, CODIGOS_ERRO.PRODUTO_CATEGORIA_EDITAR_ERR)

          return categoriaEditada
     }

     async excluir(id: number) {
          const categoriaExiste = await this.repository.listarCategoriaPorId(id)
          assertResultadoExiste(categoriaExiste, CODIGOS_ERRO.PRODUTO_CATEGORIA_N_EXISTE)

          const categoriaUtilizada = await this.repository.listarCategoriaUtilizada(id)
          assertResultadoNaoExiste(categoriaUtilizada, CODIGOS_ERRO.PRODUTO_CATEGORIA_EM_USO, id)

          const categoriaExcluida = await this.repository.excluir(id)
          assertPersistencia(categoriaExcluida, CODIGOS_ERRO.PRODUTO_CATEGORIA_EXCLUIR_ERR)

          return categoriaExcluida
     }
}