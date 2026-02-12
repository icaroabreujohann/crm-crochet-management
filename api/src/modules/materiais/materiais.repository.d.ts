import { ResultadoBusca } from '../../shared/types';
import { CriarMaterialDTO, EditarMaterialDTO, Material, MaterialCompleto } from './materiais.types';
export declare class MateriaisRepository {
    listar(): Promise<MaterialCompleto[]>;
    listarMaterialPorCodigo(codigo: string): Promise<ResultadoBusca<MaterialCompleto>>;
    listarMaterialPorId(id: number): Promise<ResultadoBusca<Material>>;
    criar(data: CriarMaterialDTO): Promise<Material | null>;
    editar(id: number, data: EditarMaterialDTO): Promise<Material | null>;
    excluir(id: number): Promise<Material | null>;
}
//# sourceMappingURL=materiais.repository.d.ts.map