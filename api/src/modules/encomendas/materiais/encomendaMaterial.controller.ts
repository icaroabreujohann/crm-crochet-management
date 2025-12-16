import { Request, Response } from 'express'
import { gerenciadorMensagens } from '../../../utils/respostas/gerenciador-resposta'
import { CODIGOS_SUCESSO } from '../../../utils/respostas/codigos-resposta'
import { validaRequisicao } from '../../../shared/validators/valida.requisicao'
import { EncomendaMaterialServices } from './encomendaMaterial.services'
import { CriarEncomendaMaterialDTO } from './encomendaMaterial.types'

export class EncomendaMaterialController {
     private services = new EncomendaMaterialServices()

     listarPorEncomenda = async (req: Request, res: Response) => {
          const codigo: string = String(req.params.codigo)

          const materiais = await this.services.listarMaterialPorEncomenda(codigo)
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.ENCOMENDA_MATERIAL_LISTAR_SUCCESS, materiais)
     }

     adicionarMaterialEncomenda = async (req: Request, res: Response) => {
          const encomenda_codigo = String(req.params.codigo)
          const data: CriarEncomendaMaterialDTO = req.body

          validaRequisicao(data, ['material_codigo', 'quantidade'])

          const materialAdicionado = await this.services.adicionarMaterial(encomenda_codigo, data)
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.ENCOMENDA_MATERIAL_CRIAR_SUCCESS, materialAdicionado)
     }

     editarMaterialEncomenda = async (req: Request, res: Response) => {
          const encomenda_codigo = String(req.params.codigo)
          const id = Number(req.params.id)
          const data = req.body

          validaRequisicao(data, ['quantidade'])

          const materialEditado = await this.services.editarMaterial(encomenda_codigo, id, data)
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.ENCOMENDA_MATERIAL_EDITAR_SUCCESS, materialEditado)
     }

     excluirMaterialEncomenda = async (req: Request, res: Response) => {
          const encomenda_codigo = String(req.params.codigo)
          const id = Number(req.params.id)

          const materialExcluido = await this.services.excluirMaterial(encomenda_codigo, id)
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.ENCOMENDA_MATERIAL_EXCLUIR_SUCCESS, materialExcluido)
     }
}