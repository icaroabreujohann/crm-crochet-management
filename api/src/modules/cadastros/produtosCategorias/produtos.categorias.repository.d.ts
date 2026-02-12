import { ResultadoBusca } from '../../../shared/types';
import { ProdutoDB } from '../../produtos/produtos.types';
import { ProdutoCategoria, ProdutoCategoriaCriarDB, ProdutoCategoriaEditarDB } from './produtos.categorias.types';
export declare class ProdutoCategoriaRepository {
    listar(): Promise<ProdutoCategoria[]>;
    listarCategoriaPorId(id: number): Promise<ResultadoBusca<ProdutoCategoria>>;
    listarCategoriaUtilizada(id: number): Promise<ResultadoBusca<ProdutoDB>>;
    criar(data: ProdutoCategoriaCriarDB): Promise<ProdutoCategoria | null>;
    editar(data: ProdutoCategoriaEditarDB): Promise<ProdutoCategoria | null>;
    excluir(id: number): Promise<ProdutoCategoria | null>;
}
//# sourceMappingURL=produtos.categorias.repository.d.ts.map