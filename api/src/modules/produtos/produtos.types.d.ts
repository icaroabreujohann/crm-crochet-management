import { TempoMedio } from "../../types/tempo.medio";
import { ProdutoMaterialCriarDTO } from "./materiais/produtoMaterial.types";
export interface ProdutoView {
    id: number;
    codigo: string;
    nome: string;
    preco: number;
    fotos_url: string;
    tempo_medio: {
        horas: number;
        minutos: number;
    };
    data_criacao: Date;
    data_alteracao: Date;
    categoria_id: number;
    categoria_nome: string;
}
export interface CriarProdutoDTO {
    nome: string;
    preco: number;
    tempo_medio: TempoMedio;
    materiais: ProdutoMaterialCriarDTO[] | [];
    categoria_id: number;
}
export type EditarProdutoDTO = Partial<{
    nome: string;
    preco: number;
    tempo_medio: TempoMedio;
    materiais: ProdutoMaterialCriarDTO[] | [];
    categoria_id: number;
}>;
export interface CriarProdutoDB {
    nome: string;
    codigo: string;
    preco: number;
    tempo_medio: number;
    fotos_url: string | null;
    categoria_id: number;
}
export type EditarProdutoDB = Partial<{
    nome: string | null;
    preco: number | null;
    tempo_medio: number | null;
    categoria_id: number;
}>;
export interface ProdutoDB {
    id: number;
    codigo: string;
    nome: string;
    preco: number;
    fotos_url: string;
    tempo_medio: number;
    data_criacao: Date;
    data_alteracao: Date;
    categoria_id: number;
    categoria_nome?: string;
}
//# sourceMappingURL=produtos.types.d.ts.map