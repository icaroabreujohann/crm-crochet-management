import { Request, Response } from 'express'
import { CODIGOS_SUCESSO } from '../../../utils/respostas/codigos-resposta'
import { gerenciadorMensagens } from '../../../utils/respostas/gerenciador-resposta'
import { UnidadesMedidaServices } from './unidades.medida.services'

export class UnidadesMedidaController {
     private services = new UnidadesMedidaServices()

     listar = async (req: Request, res: Response) => {
          const response = await this.services.listar()
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.UNIDADE_MEDIDA_LISTAR_SUCESS, response)
     }
}