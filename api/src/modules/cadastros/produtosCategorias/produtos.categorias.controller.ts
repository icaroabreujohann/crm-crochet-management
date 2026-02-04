import { Request, Response } from 'express'
import { ProdutoCategoriaServices } from './produtos.categorias.services'
import { gerenciadorMensagens } from '../../../utils/respostas/gerenciador-resposta'
import { CODIGOS_SUCESSO } from '../../../utils/respostas/codigos-resposta'
import { ProdutoCategoriaCriarDTO, ProdutoCategoriaEditarDTO } from './produtos.categorias.types'
import { validaRequisicao } from '../../../shared/validators/valida.requisicao'

export class ProdutoCategoriaController {
     private services = new ProdutoCategoriaServices()

     listar = async (req: Request, res: Response) => {
          const categorias = await this.services.listar()
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.PRODUTO_CATEGORIA_LISTAR_SUCESS, categorias)
     }

     criar = async (req: Request, res: Response) => {
          const data: ProdutoCategoriaCriarDTO = req.body
          validaRequisicao(data, ['categoria'])

          const categoriaCriada = await this.services.criar(data)
          gerenciadorMensagens.enviarMensagemSucesso(res, 201, CODIGOS_SUCESSO.PRODUTO_CATEGORIA_CRIAR_SUCESS, categoriaCriada)
     }

     editar = async (req: Request, res: Response) => {
          const id = res.locals.id
          const data: ProdutoCategoriaEditarDTO = { id, ...req.body }
          validaRequisicao(data, ['categoria'])

          const categoriaEditada = await this.services.editar(data)
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.PRODUTO_CATEGORIA_EDITAR_SUCESS, categoriaEditada)
     }

     excluir = async (req: Request, res: Response) => {
          const id = res.locals.id

          const categoriaExcluida = await this.services.excluir(id)
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.PRODUTO_CATEGORIA_EXCLUIR_SUCESS, categoriaExcluida)
     }
}