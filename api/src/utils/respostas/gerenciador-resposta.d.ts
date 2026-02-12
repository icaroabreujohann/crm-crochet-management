import { Response } from "express";
import { CodigoResposta } from "../../types/codigo.resposta";
declare class GerenciadorMensagens {
    private _criarResposta;
    criarMensagemSucesso(codigoResposta: CodigoResposta, data?: object | null): {
        sucesso: boolean;
        mensagem: string;
        codigo: number;
        data: object | null;
        definidoPeloSistema: boolean;
        codigoStatus: number;
    };
    criarMensagemErro(codigoResposta: CodigoResposta, data?: object | null): {
        sucesso: boolean;
        mensagem: string;
        codigo: number;
        data: object | null;
        definidoPeloSistema: boolean;
        codigoStatus: number;
    };
    enviarMensagemSucesso(res: Response, status: number, codigoResposta: CodigoResposta, data?: object | null): void;
    enviarMensagemErro(res: Response, status: number, codigoResposta: CodigoResposta, data?: object | null): void;
}
export declare const gerenciadorMensagens: GerenciadorMensagens;
export {};
//# sourceMappingURL=gerenciador-resposta.d.ts.map