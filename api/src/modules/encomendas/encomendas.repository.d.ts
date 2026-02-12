import { ResultadoBusca } from '../../shared/types';
import { EncomendaCriarDB, EncomendaDB, EncomendaEditarDB, EncomendaView } from './encomendas.types';
export declare class EncomendasRepository {
    private selectEncomendaView;
    listar(): Promise<EncomendaView[]>;
    listarPorProduto(produto_id: number): Promise<ResultadoBusca<EncomendaView[]>>;
    listarPorId(id: number): Promise<ResultadoBusca<EncomendaView>>;
    listarPorCodigo(codigo: string): Promise<ResultadoBusca<EncomendaView>>;
    criar(data: EncomendaCriarDB): Promise<EncomendaDB | null>;
    editar(id: number, data: EncomendaEditarDB): Promise<EncomendaDB | null>;
    excluir(id: number): Promise<EncomendaDB | null>;
}
//# sourceMappingURL=encomendas.repository.d.ts.map