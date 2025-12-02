import { randomUUID } from 'crypto'
import { CriarProdutoDTO } from '../../types/produtos'
import { CODIGOS_ERRO } from '../../utils/codigosRespostas'
import { verificaErroExiste } from '../../utils/verifcaErroExiste'
import { ProdutosRepository } from './produtos.repository'


export class ProdutosService {
     private repository = new ProdutosRepository()

     private async gerarCodigoProdutoUnico(): Promise<string>{
          let codigo = randomUUID()
          let produtoExiste = await this.repository.obterProdutoPorCodigo(codigo)

          while(produtoExiste.existe) {
               codigo = randomUUID()
               produtoExiste = await this.repository.obterProdutoPorCodigo(codigo)
          }

          return codigo
     }

     async listar() {
          return await this.repository.listar()
     }

     async listarPorId(id: number) {
          const produto = await this.repository.listarPorId(id)
          verificaErroExiste([{condicao: !produto, valor: id, codigoResposta: CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR}])

          return produto
     }

     async criar(data: CriarProdutoDTO) {
          const codigo: string = await this.gerarCodigoProdutoUnico()
          const fotos_url = `/produtos/fotos/${codigo}`

          const produtoCriado = await this.repository.criar({...data, codigo, fotos_url})
          return produtoCriado
     }
}