import { Request, Response } from 'express';
import { EncomendasServices } from './encomendas.services';
export declare class EncomendasController {
    private services;
    constructor(services?: EncomendasServices);
    listarEncomendas: (req: Request, res: Response) => Promise<void>;
    listarEncomendaCompleta: (req: Request, res: Response) => Promise<void>;
    criarEncomenda: (req: Request, res: Response) => Promise<void>;
    editarEncomenda: (req: Request, res: Response) => Promise<void>;
    excluirEncomenda: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=encomendas.controller.d.ts.map