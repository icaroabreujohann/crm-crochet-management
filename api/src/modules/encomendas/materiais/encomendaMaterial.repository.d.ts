import { ResultadoBusca } from '../../../shared/types';
import { EncomendaMaterialCriarDB, EncomendaMaterialDB, EncomendaMaterialView } from './encomendaMaterialtypes';
export declare class EncomendaMaterialRepository {
    listarMaterialPorEncomenda(encomenda_id: number): Promise<ResultadoBusca<EncomendaMaterialView[]>>;
    criar(data: EncomendaMaterialCriarDB): Promise<EncomendaMaterialDB | null>;
    excluirPorEncomenda(encomenda_id: number): Promise<void>;
}
//# sourceMappingURL=encomendaMaterial.repository.d.ts.map