import { ProdutoMaterialRepository } from './produtoMaterial.repository'
import { ProdutosRepository } from '../produtos.repository'
import { MateriaisRepository } from '../../materiais/materiais.repository'
import { ProdutoMaterialCriarDTO, ProdutoMaterialCriarDB } from './produtoMaterial.types'
import { assertResultadoExiste } from '../../../shared/asserts/assertResultadoBusca'
import { CODIGOS_ERRO } from '../../../utils/respostas/codigos-resposta'
import { validaRegraNegocio } from '../../../shared/validators/valida.regranegocio'

export class ProdutoMaterialService {
     private repository = new ProdutoMaterialRepository()
     private repositoryMaterial = new MateriaisRepository()
     private repositoryProdutos = new ProdutosRepository()

     async adicionarMaterial(produto_id: number, data: ProdutoMaterialCriarDTO) {
          const produto = await this.repositoryProdutos.listarProdutoPorId(produto_id)
          assertResultadoExiste(produto, CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR, produto_id)

          const material = await this.repositoryMaterial.listarMaterialPorCodigo(data.material_codigo)
          assertResultadoExiste(material, CODIGOS_ERRO.MATERIAL_N_EXISTE_ERR, data.material_codigo)

          const materialProduto = {
               produto_id: produto.data.id,
               material_id: material.data.id,
               quantidade: data.quantidade,
               preco_final: material.data.preco_x_qtd * data.quantidade
          }
          return await this.repository.criar(materialProduto)
     }
}