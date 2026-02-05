import { Request, Response } from "express";
import { CODIGOS_SUCESSO } from "../../utils/respostas/codigos-resposta";
import { gerenciadorMensagens } from "../../utils/respostas/gerenciador-resposta";
import { RelatoriosServices } from "./relatorios.services";

export class RelatoriosController {
     constructor(
          private services = new RelatoriosServices()
     ) { }

     listarEncomendasResumoMensal = async (req: Request, res: Response) => {
          const relatorio = await this.services.listarEncomendasResumoMensal()
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.RELATORIO_LISTAR_SUCESS, relatorio)
     }

     listarEncomendasFaturamentoMensal = async (req: Request, res: Response) => {
          const relatorio = await this.services.listarEncomendasFaturamentoMensal()
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.RELATORIO_LISTAR_SUCESS, relatorio)
     }

     listarProdutoCategoria = async (req: Request, res: Response) => {
          const relatorio = await this.services.listarProdutoCategoria()
          gerenciadorMensagens.enviarMensagemSucesso(res, 200, CODIGOS_SUCESSO.RELATORIO_LISTAR_SUCESS, relatorio)
     }
}