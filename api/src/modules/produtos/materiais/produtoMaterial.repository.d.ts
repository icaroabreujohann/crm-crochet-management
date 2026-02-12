import { ResultadoBusca } from '../../../shared/types';
import { ProdutoMaterialCriarDB, ProdutoMaterialDB, ProdutoMaterialView } from './produtoMaterial.types';
export declare class ProdutoMaterialRepository {
    listarMaterialPorProduto(produto_id: number): Promise<ResultadoBusca<ProdutoMaterialView[]>>;
    criar(data: ProdutoMaterialCriarDB): Promise<ProdutoMaterialDB | null>;
    excluirPorProduto(produto_id: number): Promise<void>;
}
//# sourceMappingURL=produtoMaterial.repository.d.ts.map