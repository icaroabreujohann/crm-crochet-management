import { ProdutoCategoriaRepository } from './produtos.categorias.repository';
import { ProdutoCategoriaCriarDTO, ProdutoCategoriaEditarDTO } from './produtos.categorias.types';
export declare class ProdutoCategoriaServices {
    private repository;
    constructor(repository?: ProdutoCategoriaRepository);
    listar(): Promise<import("./produtos.categorias.types").ProdutoCategoria[]>;
    criar(data: ProdutoCategoriaCriarDTO): Promise<import("./produtos.categorias.types").ProdutoCategoria>;
    editar(data: ProdutoCategoriaEditarDTO): Promise<import("./produtos.categorias.types").ProdutoCategoria>;
    excluir(id: number): Promise<import("./produtos.categorias.types").ProdutoCategoria>;
}
//# sourceMappingURL=produtos.categorias.services.d.ts.map