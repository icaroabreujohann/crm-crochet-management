import { ProdutoMaterialRepository } from './produtoMaterial.repository'
import { ProdutosRepository } from '../produtos.repository'
import { MateriaisRepository } from '../../materiais/materiais.repository'
import { CriarProdutoMaterialDTO } from './produtoMaterial.types'
import { assertResultadoExiste } from '../../../shared/asserts/assertResultadoBusca'
import { CODIGOS_ERRO } from '../../../utils/codigosRespostas'

export class ProdutoMaterialService {
     private repository = new ProdutoMaterialRepository()
     private repositoryMaterial = new MateriaisRepository()
     private repositoryProdutos = new ProdutosRepository()

     async listarMaterialPorProduto(produto_codigo: string) {
          const produto = await this.repositoryProdutos.obterProdutoPorCodigo(produto_codigo)
          assertResultadoExiste(produto, CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR, produto_codigo)

          return this.repository.listarPorProduto(produto.data.id)
     }

     async adicionarMaterial(produto_codigo: string, data: CriarProdutoMaterialDTO) {
          console.log('prod_codguuid:',produto_codigo)
          const produto = await this.repositoryProdutos.obterProdutoPorCodigo(produto_codigo)
          assertResultadoExiste(produto, CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR, produto_codigo)

          const material = await this.repositoryMaterial.obterMaterialPorCodigo(data.material_codigo)
          assertResultadoExiste(material, CODIGOS_ERRO.MATERIAL_N_EXISTE_ERR, data.material_codigo)

          const materialProduto = {
               produto_id: produto.data.id,
               material_id: material.data.id,
               quantidade: data.quantidade,
               preco_final: material.data.preco_x_qtd * data.quantidade
          }
          return this.repository.criar(materialProduto)
     }
}