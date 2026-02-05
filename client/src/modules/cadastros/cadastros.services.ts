import { api } from '@/plugins/api'
import type { ProdutoCategoria, TipoMaterial, UnidadeMedida } from './cadastros.types'
import type { RespostaApi } from '@/types/resposta.api'

export const CadastrosServices = {
     async listarTiposMateriais(): Promise<TipoMaterial[]> {
          const { data } = await api.get<RespostaApi<TipoMaterial[]>>('/cadastros/tipos_materiais')
          return data.data
     },

     async listarUnidadesMedida(): Promise<UnidadeMedida[]> {
          const { data } = await api.get<RespostaApi<UnidadeMedida[]>>('/cadastros/unidades_medida')
          return data.data
     },

     //Produto Categoria

     async listarProdutoCategorias(): Promise<ProdutoCategoria[]> {
          const { data } = await api.get<RespostaApi<ProdutoCategoria[]>>('/cadastros/produto_categoria')
          return data.data
     }
}