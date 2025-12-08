import { sql } from '../../../config/db'
import { ResultadoBusca } from '../../../shared/types';
import { resultadoEncontrado, resultadoInexistente } from '../../../utils/resultadoBusca';
import { CriarProdutoMaterialRepoDTO, ProdutoMaterial } from './produtoMaterial.types';

export class ProdutoMaterialRepository {
     async listarPorProduto(produto_id: number):Promise<ResultadoBusca<ProdutoMaterial[]>> {
          const materiais = await sql<ProdutoMaterial[]>`
               select
                    pm.*,
                    m.nome as material_nome,
                    m.preco_x_qtd as material_preco_x_qtd
               from
                    produtos_materiais pm
               join materiais m
                    on m.id = pm.material_id
               where pm.produto_id = ${produto_id}

          `
          return materiais ? resultadoEncontrado(materiais) : resultadoInexistente()
     }

     async criar(data: CriarProdutoMaterialRepoDTO):Promise<ProdutoMaterial | null> {
          console.log('data:',data)
          const [material] = await sql<ProdutoMaterial[]>`
          insert into produtos_materiais (produto_id,material_id,quantidade,preco_final)
          values (
               ${data.produto_id},
               ${data.material_id},
               ${data.quantidade},
               ${data.preco_final}
          )
          returning *
     `
          return material ?? null
     }
}