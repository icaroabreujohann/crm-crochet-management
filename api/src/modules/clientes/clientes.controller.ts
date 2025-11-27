import { NextFunction, Request, Response } from 'express'
import { ClientesService } from '../clientes/clientes.services'
import { gerenciadorMensagens } from '../../utils/gerenciadorRepostas'
import { CODIGOS_SUCESSO } from '../../utils/codigosRespostas'
import { validaRequisicao, validaTipoDado } from '../../validators/validador.requisicao'

export class ClientesController {
     private service = new ClientesService()

     listarClientes = async (req: Request, res: Response) => {
          const response = await this.service.listarClientes()
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.CLIENTE_LISTAR_SUCESS, response)
     }

     listarClientePorId = async (req: Request, res: Response) => {
          const id = Number(req.params.id)
          validaRequisicao({ id }, ['id'])
          validaTipoDado(id, 'number')

          const response = await this.service.listarClientePorId(Number(req.params.id))
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.CLIENTE_LISTAR_SUCESS, response)
     }
}
