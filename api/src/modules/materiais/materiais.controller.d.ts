import { Request, Response } from 'express';
export declare class MaterialsController {
    private service;
    listarMateriais: (req: Request, res: Response) => Promise<void>;
    listarMaterialCodigo: (req: Request, res: Response) => Promise<void>;
    criarMaterial: (req: Request, res: Response) => Promise<void>;
    editarMaterial: (req: Request, res: Response) => Promise<void>;
    excluirMaterial: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=materiais.controller.d.ts.map