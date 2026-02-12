import { EncomendaMaterialCriarDTO } from './encomendaMaterialtypes';
export declare class EncomendaMaterialService {
    private repository;
    private repositoryMaterial;
    private repositoryEncomenda;
    adicionarMaterial(encomenda_id: number, data: EncomendaMaterialCriarDTO): Promise<import("./encomendaMaterialtypes").EncomendaMaterialDB | null>;
}
//# sourceMappingURL=encomendaMaterial.services.d.ts.map