import { randomUUID } from 'crypto'
import { CriarProdutoDTO, EditarProdutoDTO } from '../../types/produtos'
import { CODIGOS_ERRO } from '../../utils/codigosRespostas'
import { verificaErroExiste } from '../../utils/verifcaErroExiste'
import { ProdutosRepository } from './produtos.repository'
import path from 'path'
import { PRODUTOS_DIR } from '../../infra/upload/paths'
import { criaPastaSeNaoExistir } from '../../infra/upload/armazenamento'
import { salvarFotosProduto } from '../../utils/salvarFotosProdutos'


export class ProdutosService {
     private repository = new ProdutosRepository()

     private async gerarCodigoProdutoUnico(): Promise<string> {
          let codigo = randomUUID()
          let produtoExiste = await this.repository.obterProdutoPorCodigo(codigo)

          while (produtoExiste.existe) {
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
          verificaErroExiste([{ condicao: !produto, valor: 'ID Inexistente.', codigoResposta: CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR }])

          return produto
     }

     async criarProduto(data: CriarProdutoDTO, fotos: Express.Multer.File[]) {
          const codigo: string = await this.gerarCodigoProdutoUnico()
          const fotos_url = `arquivos/produtos/${codigo}`

          await salvarFotosProduto(codigo, fotos, PRODUTOS_DIR)

          const produtoCriado = await this.repository.criar({ ...data, codigo, fotos_url })
          return produtoCriado
     }

     async editarProduto(id: number, data: EditarProdutoDTO) {
          const [produtoExiste] = await Promise.all([
               this.repository.obterProdutoPorId(id)
          ])

          verificaErroExiste([{ condicao: !produtoExiste.existe, valor: id, codigoResposta: CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR }])

          const produtoEditado = await this.repository.editar(id, data)
          return produtoEditado
     }

     async excluirProduto(id: number) {
          const [produtoExiste] = await Promise.all([
               this.repository.obterProdutoPorId(id)
          ])
          verificaErroExiste([{ condicao: !produtoExiste.existe, valor: id, codigoResposta: CODIGOS_ERRO.PRODUTO_N_EXISTE_ERR }])

          const produtoExcluido = await this.repository.excluir(id)
          return produtoExcluido
     }
}