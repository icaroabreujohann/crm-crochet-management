import { api } from '@/plugins/api'
import type { TipoMaterial,UnidadeMedida } from './cadastros.types'
import type { RespostaApi } from '@/types/resposta.api'

export const CadastrosServices = {
     async listarTiposMateriais(): Promise<TipoMaterial[]> {
          const {data} = await api.get<TipoMaterial[]>('/cadastros/tipos_materiais')
          return data
     },

     async listarUnidadesMedida(): Promise<UnidadeMedida[]> {
          const {data} = await api.get<UnidadeMedida[]>('/cadastros/unidades_medida')
          return data
     }
}