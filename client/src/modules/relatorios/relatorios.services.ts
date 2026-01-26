import { api } from "@/plugins/api"
import type { EncomendasResumoMensal } from "./relatorios.types"
import type { RespostaApi } from "@/types/resposta.api"


export const RelatoriosServices = {
     async listarEncomendasMensal(): Promise<EncomendasResumoMensal[]> {
          const { data } = await api.get<RespostaApi<EncomendasResumoMensal[]>>('/relatorios/encomendas/mensal')
          return data.data
     }
}