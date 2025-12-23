import { api } from '@/plugins/api'
import type {  Material, MaterialCompleto, CriarMaterialDTO, EditarMaterialDTO } from './materiais.types'
import type { RespostaApi } from '@/types/resposta.api'

export const MateriaisServices = {

     async listar(): Promise<MaterialCompleto[]> {
          const { data } = await api.get<RespostaApi<MaterialCompleto[]>>('/materiais')

          return data.data
     },

     async listarPorId(codigo: string): Promise<MaterialCompleto> {
          const { data } = await api.get<RespostaApi<MaterialCompleto>>(`/materiais/${codigo}`)
          return data.data
     },

}