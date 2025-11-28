import { EditarClienteDTO } from "../../types/cliente";
import { CriarEncomendaDTO, EditarEncomendaDTO } from "../../types/encomenda";
import { CODIGOS_SUCESSO } from "../../utils/codigosRespostas";
import { gerenciadorMensagens } from "../../utils/gerenciadorRepostas";
import { validaRequisicao } from "../../validators/valida.requisicao";
import { EncomendasServices } from "./encomendas.services";
import { Request, Response } from "express";

export class EncomendasController {
     private service = new EncomendasServices

     listarEncomendas = async (req: Request, res: Response) => {
          const response = await this.service.listar()
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.ENCOMENDA_LISTAR_SUCESS, response)
     }

     listarEncomendaPorId = async (req: Request, res: Response) => {
          const id = Number(req.params.id)

          const response = await this.service.listarPorId(id)
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.ENCOMENDA_LISTAR_SUCESS, response)
     }

     criarEncomenda = async (req: Request, res: Response) => {
          const data: CriarEncomendaDTO = req.body
          validaRequisicao(data, ['titulo', 'clienteId', 'dataPrazo'])

          const response = await this.service.criarEncomenda(data)
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.ENCOMENDA_CRIAR_SUCESS, response)
     }

     editarEncomenda = async (req: Request, res: Response) => {
          const id = Number(req.params.id)
          const data: EditarEncomendaDTO = req.body
          validaRequisicao(data, ['titulo', 'dataPrazo'])

          const response = await this.service.editarEncomenda(id, data)
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.ENCOMENDA_CRIAR_SUCESS, response)
     }

     excluirEncomenda = async (req: Request, res: Response) => {
          const id = Number(req.params.id)

          const response = await this.service.excluirEncomenda(id)
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.ENCOMENDA_EXCLUIR_SUCESS, response)
     }

}