import { Request, Response } from "express";
import { RelatoriosServices } from "./relatorios.services";
export declare class RelatoriosController {
    private services;
    constructor(services?: RelatoriosServices);
    listarEncomendasResumoMensal: (req: Request, res: Response) => Promise<void>;
    listarEncomendasFaturamentoMensal: (req: Request, res: Response) => Promise<void>;
    listarProdutoCategoria: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=relatorios.controller.d.ts.map