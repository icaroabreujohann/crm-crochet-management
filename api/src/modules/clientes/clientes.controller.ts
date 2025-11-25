import {Request, Response} from 'express'
import { ClientesService } from '../clientes/clientes.services'
import { gerenciadorMensagens } from '../../utils/gerenciadorRepostas'
import { CODIGOS_SUCESSO } from '../../utils/codigosRespostas'

export class ClientesController {
     private service = new ClientesService()

     listarClientes = async (req: Request, res: Response) =>  {
          const response = await this.service.listarClientes()
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.CLIENTE_LISTAR_SUCESS, response)
     }
}
