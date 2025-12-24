import { Request, Response } from 'express'
import { CODIGOS_SUCESSO } from '../../../utils/respostas/codigos-resposta'
import { gerenciadorMensagens } from '../../../utils/respostas/gerenciador-resposta'
import { TiposMateriaisServices } from './tipos.materiais.services'

export class TiposMateriaisController {
     private services = new TiposMateriaisServices()

     listar = async (req: Request, res: Response) => {
          const response = await this.services.listar()
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.TIPO_MATERIAL_LISTAR_SUCESS, response)
     }
}