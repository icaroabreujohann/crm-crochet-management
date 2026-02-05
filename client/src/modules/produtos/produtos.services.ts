import { api } from '@/plugins/api'
import type { RespostaApi } from '@/types/resposta.api'
import type { ProdutoView, ProdutoForm, ProdutoPayload } from './produtos.types'

function produtoFotosToFormData(fotos: File[] | null): FormData {
     const formData = new FormData()
     if (fotos) {
          fotos.forEach((foto) => {
               if (foto instanceof File) {
                    formData.append('fotos', foto, foto.name)
               }
          })
     }

     return formData
}

async function criar(payload: Partial<ProdutoPayload>) {
     const { fotos, ...produtoPayload } = payload
     const { data } = await api.post<RespostaApi<ProdutoView>>('/produtos', produtoPayload)

     if (fotos?.length && data.sucesso) {
          const fotosFormData = produtoFotosToFormData(fotos)
          await api.post(`/produtos/${data.data.codigo}/fotos`, fotosFormData)
     }

     return data.data
}

async function editar(codigo: string, payload: Partial<ProdutoPayload>) {
     const { fotos, ...produtoPayload } = payload
     const { data } = await api.patch<RespostaApi<ProdutoView>>(`/produtos/${codigo}`, produtoPayload)

     console.log('fotos', fotos)
     console.log(!!fotos?.length)

     if (fotos !== undefined && data.sucesso) {
          const fotosFormData = produtoFotosToFormData(fotos)
          await api.post(`/produtos/${codigo}/fotos`, fotosFormData)
     }

     return data.data
}

function validarProdutoForm(form: Partial<ProdutoForm>): ProdutoPayload {
     if (!form.nome || form.nome.trim() === '') {
          throw new Error('Nome é obrigatório')
     }

     if (form.preco === undefined || form.preco <= 0) {
          throw new Error('Preço deve ser maior que zero')
     }

     if (form.categoria_id === null || form.categoria_id === undefined) {
          throw new Error('Categoria é obrigatória')
     }

     if (!form.tempo_medio) {
          throw new Error('Tempo médio é obrigatório')
     }

     return {
          nome: form.nome,
          preco: form.preco,
          tempo_medio: form.tempo_medio,
          fotos: form.fotos,
          materiais: form.materiais,
          categoria_id: form.categoria_id
     }
}

export const ProdutosServices = {
     async listar(): Promise<ProdutoView[]> {
          const { data } = await api.get<RespostaApi<ProdutoView[]>>('/produtos')

          return data.data
     },

     async listarPorCodigo(codigo: string): Promise<ProdutoView> {
          const { data } = await api.get<RespostaApi<ProdutoView>>(`/produtos/${codigo}/completo`)
          return data.data
     },

     async listarFotos(codigo: string): Promise<[]> {
          const { data } = await api.get(`/arquivos/produtos/${codigo}`)
          return data.data
     },

     async salvar(form: Partial<ProdutoForm>): Promise<ProdutoView> {
          if (form.categoria_id == null) { }
          const payload = validarProdutoForm(form)

          if (!form.codigo) { return await criar(payload) }
          return await editar(form.codigo, payload)
     },

     async excluir(codigo: string): Promise<ProdutoView> {
          const { data } = await api.delete<RespostaApi<ProdutoView>>(`/produtos/${codigo}`)
          return data.data
     }

}

