import { api } from '@/plugins/api'
import type { ProdutoCategoria, ProdutoCategoriaCriarDTO, ProdutoCategoriaEditarDTO, ProdutoCategoriaForm, TipoMaterial, UnidadeMedida } from './cadastros.types'
import type { RespostaApi } from '@/types/resposta.api'

async function criarProdutoCategoria(payload: ProdutoCategoriaCriarDTO): Promise<ProdutoCategoria> {
     const { data } = await api.post<RespostaApi<ProdutoCategoria>>('/cadastros/produto_categoria', payload)
     return data.data
}

async function editarProdutoCategoria(id: number, payload: ProdutoCategoriaCriarDTO): Promise<ProdutoCategoria> {
     const { data } = await api.patch<RespostaApi<ProdutoCategoria>>(`/cadastros/produto_categoria/${id}`, payload)
     return data.data
}

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
     },

     async salvarProdutoCategoria(form: Partial<ProdutoCategoriaForm>) {
          const payload = {
               categoria: form.categoria ?? ''
          }

          if (!form.id) { return await criarProdutoCategoria(payload) }
          
          return await editarProdutoCategoria(form.id, payload)
     },

     async excluirProdutoCategoria(id: number): Promise<ProdutoCategoria> {
          const { data } = await api.delete<RespostaApi<ProdutoCategoria>>(`/cadastros/produto_categoria/${id}`)
          return data.data
     }

}