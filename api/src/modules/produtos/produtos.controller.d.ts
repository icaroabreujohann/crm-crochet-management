import { Request, Response } from 'express';
export declare class ProdutosController {
    private service;
    listarProdutos: (req: Request, res: Response) => Promise<void>;
    listarProdutoCodigo: (req: Request, res: Response) => Promise<void>;
    listarProdutoCompleto: (req: Request, res: Response) => Promise<void>;
    criarProduto: (req: Request, res: Response) => Promise<void>;
    editarProduto: (req: Request, res: Response) => Promise<void>;
    editarFotosProduto: (req: Request, res: Response) => Promise<void>;
    excluirProduto: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=produtos.controller.d.ts.map