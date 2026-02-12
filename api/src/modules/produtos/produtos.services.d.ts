import { CriarProdutoDTO, EditarProdutoDTO } from './produtos.types';
import { ProdutosRepository } from './produtos.repository';
import { ProdutoMaterialRepository } from './materiais/produtoMaterial.repository';
import { FotoWEBP } from '../../infra/filesystem/converte-fotos';
import { ProdutoMaterialService } from './materiais/produtoMaterial.services';
import { EncomendasRepository } from '../encomendas/encomendas.repository';
export declare class ProdutosService {
    private repository;
    private repositoryMateriais;
    private servicesMateriais;
    private repositoryEncomendas;
    constructor(repository?: ProdutosRepository, repositoryMateriais?: ProdutoMaterialRepository, servicesMateriais?: ProdutoMaterialService, repositoryEncomendas?: EncomendasRepository);
    private gerarCodigoProdutoUnico;
    private inserirMateriaisDoProduto;
    private excluirMateriaisDoProduto;
    listar(): Promise<import("./produtos.types").ProdutoView[]>;
    listarPorCodigo(codigo: string): Promise<import("./produtos.types").ProdutoView>;
    listarCompleto(codigo: string): Promise<{
        materiais: import("./materiais/produtoMaterial.types").ProdutoMaterialView[];
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
    }>;
    criarProduto(data: CriarProdutoDTO, fotos: FotoWEBP[]): Promise<import("./produtos.types").ProdutoDB>;
    editarProduto(codigo: string, data: EditarProdutoDTO): Promise<import("./produtos.types").ProdutoDB>;
    editarFotosProduto(codigo: string, fotos: FotoWEBP[]): Promise<{
        existe: true;
        data: import("./produtos.types").ProdutoDB;
    }>;
    excluirProduto(codigo: string): Promise<import("./produtos.types").ProdutoDB>;
}
//# sourceMappingURL=produtos.services.d.ts.map