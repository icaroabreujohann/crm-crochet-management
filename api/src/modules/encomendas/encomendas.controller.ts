import { CODIGOS_SUCESSO } from "../../utils/codigosRespostas";
import { gerenciadorMensagens } from "../../utils/gerenciadorRepostas";
import { EncomendasServices } from "./encomendas.services";
import { Request, Response } from "express";

export class EncomendasController {
     private service = new EncomendasServices

     listarEncomendas = async (req: Request, res: Response) => {
          const response = await this.service.listar()
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.ENCOMENDA_LISTAR_SUCESS, response)
     }
}