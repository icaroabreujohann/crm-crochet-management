import { api } from '@/plugins/api'
import type { RespostaApi } from '@/types/resposta.api'
import type { Produto } from './produtos.types'


export const ProdutosServices = {

     async listar(): Promise<Produto[]> {
          const { data } = await api.get<RespostaApi<Produto[]>>('/produtos')

          return data.data
     },


}

