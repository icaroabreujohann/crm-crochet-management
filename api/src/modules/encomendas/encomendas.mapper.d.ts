import { ProdutoMaterialView } from '../produtos/materiais/produtoMaterial.types';
import { EncomendaCriarDTO, EncomendaCriarDB, EncomendaEditarDTO, EncomendaEditarDB } from './encomendas.types';
import { EncomendaMaterialCriarDTO } from './materiais/encomendaMaterialtypes';
export declare const mapEncomendaCriarDTOParaDB: (data: EncomendaCriarDTO, codigo: string, produto_id: number) => EncomendaCriarDB;
export declare const mapEncomendaEditarDTOParaDB: (data: EncomendaEditarDTO, produto_id?: number) => EncomendaEditarDB;
export declare const mapProdutoMaterialParaEncomendaMaterial: (data: ProdutoMaterialView[]) => EncomendaMaterialCriarDTO[];
//# sourceMappingURL=encomendas.mapper.d.ts.map