import { ProdutoMaterialCriarDTO } from './produtoMaterial.types';
export declare class ProdutoMaterialService {
    private repository;
    private repositoryMaterial;
    private repositoryProdutos;
    adicionarMaterial(produto_id: number, data: ProdutoMaterialCriarDTO): Promise<import("./produtoMaterial.types").ProdutoMaterialDB | null>;
}
//# sourceMappingURL=produtoMaterial.services.d.ts.map