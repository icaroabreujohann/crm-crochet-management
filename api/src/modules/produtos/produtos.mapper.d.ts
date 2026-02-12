import { CriarProdutoDTO, CriarProdutoDB, EditarProdutoDTO, EditarProdutoDB, ProdutoView, ProdutoDB } from './produtos.types';
export declare const mapProdutoDBParaView: (produto: ProdutoDB) => ProdutoView;
export declare const mapCriarProdutoDTOParaDB: (data: CriarProdutoDTO, codigo: string, fotos_url: string) => CriarProdutoDB;
export declare const mapEditarProdutoDTOparaDB: (data: EditarProdutoDTO) => EditarProdutoDB;
//# sourceMappingURL=produtos.mapper.d.ts.map