import { CodigoResposta } from "./codigo.resposta";
export declare class ErroCustomizado extends Error {
    definidoPeloSistema: boolean;
    codigoResposta: CodigoResposta;
    data: any;
    codigoStatus: number;
    constructor(codigoResposta: CodigoResposta, data?: any, codigoStatus?: number);
}
//# sourceMappingURL=erro.customizado.d.ts.map