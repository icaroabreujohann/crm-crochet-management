import { CriarMaterialDTO, EditarMaterialDTO } from './materiais.types';
export declare class MateriaisServices {
    private repository;
    private gerarCodigoMaterialUnico;
    listar(): Promise<import("./materiais.types").MaterialCompleto[]>;
    listarPorCodigo(codigo: string): Promise<{
        existe: true;
        data: import("./materiais.types").MaterialCompleto;
    }>;
    criarMaterial(data: CriarMaterialDTO): Promise<import("./materiais.types").Material | null>;
    editarMaterial(codigo: string, data: EditarMaterialDTO): Promise<import("./materiais.types").Material | null>;
    excluirMaterial(codigo: string): Promise<import("./materiais.types").Material | null>;
}
//# sourceMappingURL=materiais.services.d.ts.map