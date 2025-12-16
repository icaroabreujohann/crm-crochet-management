import { Request, Response } from 'express'
import { ClientesService } from '../clientes/clientes.services'
import { gerenciadorMensagens } from '../../utils/respostas/gerenciador-resposta'
import { CODIGOS_SUCESSO } from '../../utils/respostas/codigos-resposta'
import { validaRequisicao, validaTipoDado } from '../../shared/validators/valida.requisicao'
import { CriarClienteDTO, EditarClienteDTO } from './clientes.types'

export class ClientesController {
     private service = new ClientesService()

     listarClientes = async (req: Request, res: Response) => {
          const response = await this.service.listarClientes()
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.CLIENTE_LISTAR_SUCESS, response)
     }

     listarClientePorId = async (req: Request, res: Response) => {
          const id: number = res.locals.id

          const response = await this.service.listarClientePorId(id)
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.CLIENTE_LISTAR_SUCESS, response)
     }

     criarCliente = async (req: Request, res: Response) => {
          const data: CriarClienteDTO = req.body
          validaRequisicao(data, ['nome'])

          const response = await this.service.criarCliente(data)
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.CLIENTE_CRIAR_SUCESS, response)
     }

     editarCliente = async (req: Request, res: Response) => {
          const id: number = res.locals.id
          const data: EditarClienteDTO = req.body
          validaRequisicao(data, ['nome'])

          const response = await this.service.editarCliente(id, data)
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.CLIENTE_EDITAR_SUCESS, response)
     }

     excluirCliente = async (req: Request, res: Response) => {
          const id: number = res.locals.id

          const response = await this.service.excluirCliente(id)
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.CLIENTE_EXCLUIR_SUCESS, response)
     }
}
