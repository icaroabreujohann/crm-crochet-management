import { EncomendasRepository } from './encomendas.repository';
import { EncomendaMaterialService } from './materiais/encomendaMaterial.services';
import { EncomendaMaterialRepository } from './materiais/encomendaMaterial.repository';
import { EncomendaCriarDTO, EncomendaEditarDTO } from './encomendas.types';
import { ProdutosRepository } from '../produtos/produtos.repository';
import { ClientesRepository } from '../clientes/clientes.repository';
import { ProdutoMaterialRepository } from '../produtos/materiais/produtoMaterial.repository';
export declare class EncomendasServices {
    private repository;
    private repositoryMateriais;
    private repositoryMateriaisProdutos;
    private repositoryProdutos;
    private repositoryClientes;
    private servicesMateriaisEncomendas;
    constructor(repository?: EncomendasRepository, repositoryMateriais?: EncomendaMaterialRepository, repositoryMateriaisProdutos?: ProdutoMaterialRepository, repositoryProdutos?: ProdutosRepository, repositoryClientes?: ClientesRepository, servicesMateriaisEncomendas?: EncomendaMaterialService);
    private gerarCodigoEncomendaUnico;
    private inserirMateriaisDaEncomenda;
    private excluirMateriaisDaEncomenda;
    listar(): Promise<import("./encomendas.types").EncomendaView[]>;
    listarPorCodigo(codigo: string): Promise<import("./encomendas.types").EncomendaView>;
    listarCompleto(codigo: string): Promise<{
        materiais: import("./materiais/encomendaMaterialtypes").EncomendaMaterialView[];
        id: number;
        cliente_id: number;
        cliente_nome: string;
        produto_id: number;
        produto_codigo: string;
        produto_nome: string;
        preco_final: number;
        observacoes: string | null;
        status_pagamento: "pendente" | "parcial" | "pago";
        forma_pagamento: string | null;
        finalizado: boolean;
        entregue: boolean;
        local_entrega: string | null;
        data_pedido: string;
        data_prazo: string;
        data_alteracao: Date;
    }>;
    criar(data: EncomendaCriarDTO): Promise<import("./encomendas.types").EncomendaDB>;
    editar(codigo: string, data: EncomendaEditarDTO): Promise<import("./encomendas.types").EncomendaDB | undefined>;
    excluir(encomenda_codigo: string): Promise<import("./encomendas.types").EncomendaDB>;
}
//# sourceMappingURL=encomendas.services.d.ts.map