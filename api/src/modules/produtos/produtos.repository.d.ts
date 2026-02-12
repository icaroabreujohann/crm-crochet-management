import { ResultadoBusca } from "../../shared/types";
import { CriarProdutoDB, EditarProdutoDB, ProdutoDB } from "./produtos.types";
export declare class ProdutosRepository {
    private selectProdutoBase;
    listar(): Promise<ProdutoDB[]>;
    listarProdutoPorCodigo(codigo: string): Promise<ResultadoBusca<ProdutoDB>>;
    listarProdutoPorId(id: number): Promise<ResultadoBusca<ProdutoDB>>;
    criar(data: CriarProdutoDB): Promise<ProdutoDB | null>;
    editar(id: number, data: EditarProdutoDB): Promise<ProdutoDB | null>;
    excluir(id: number): Promise<ProdutoDB | null>;
    atualizarDataAlteracao(id: number): Promise<void>;
}
//# sourceMappingURL=produtos.repository.d.ts.map