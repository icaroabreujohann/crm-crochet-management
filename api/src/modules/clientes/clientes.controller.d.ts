import { Request, Response } from 'express';
export declare class ClientesController {
    private service;
    listarClientes: (req: Request, res: Response) => Promise<void>;
    listarClientePorId: (req: Request, res: Response) => Promise<void>;
    criarCliente: (req: Request, res: Response) => Promise<void>;
    editarCliente: (req: Request, res: Response) => Promise<void>;
    excluirCliente: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=clientes.controller.d.ts.map