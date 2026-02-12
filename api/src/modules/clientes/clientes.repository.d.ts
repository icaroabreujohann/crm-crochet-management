import { Cliente, CriarClienteDTO, EditarClienteDTO } from './clientes.types';
import { ResultadoBusca } from "../../shared/types";
export declare class ClientesRepository {
    listar(): Promise<Cliente[]>;
    listarPorId(id: number): Promise<ResultadoBusca<Cliente>>;
    listarClientePorInstagram(instagram: string): Promise<ResultadoBusca<Cliente>>;
    listarClientePorTelefone(telefone: string): Promise<ResultadoBusca<Cliente>>;
    criar(data: CriarClienteDTO): Promise<Cliente | null>;
    editar(id: number, data: EditarClienteDTO): Promise<Cliente | null>;
    excluir(id: number): Promise<Cliente | null>;
}
//# sourceMappingURL=clientes.repository.d.ts.map