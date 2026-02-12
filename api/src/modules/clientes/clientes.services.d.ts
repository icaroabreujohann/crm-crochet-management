import { Cliente, CriarClienteDTO, EditarClienteDTO } from './clientes.types';
export declare class ClientesService {
    private repository;
    listarClientes(): Promise<Cliente[]>;
    listarClientePorId(id: number): Promise<{
        existe: true;
        data: Cliente;
    }>;
    criarCliente(data: CriarClienteDTO): Promise<Cliente | null>;
    editarCliente(id: number, data: EditarClienteDTO): Promise<Cliente | null>;
    excluirCliente(id: number): Promise<Cliente | null>;
}
//# sourceMappingURL=clientes.services.d.ts.map