import { api } from "@/plugins/api"
import type { EncomendasFaturamentoMensal, EncomendasResumoMensal, ProdutoCategoriaTotal } from "./relatorios.types"
import type { RespostaApi } from "@/types/resposta.api"


export const RelatoriosServices = {
     async listarEncomendasMensal(): Promise<EncomendasResumoMensal[]> {
          const { data } = await api.get<RespostaApi<EncomendasResumoMensal[]>>('/relatorios/encomendas/mensal')
          return data.data
     },

     async listarEncomendasFaturamentoMensal(): Promise<EncomendasFaturamentoMensal[]> {
          const { data } = await api.get<RespostaApi<EncomendasFaturamentoMensal[]>>('/relatorios/encomendas/mensal/faturamento')
          return data.data
     },

     async listarProdutoCategoriaTotal(): Promise<ProdutoCategoriaTotal[]> {
          const { data } = await api.get<RespostaApi<ProdutoCategoriaTotal[]>>('/relatorios/produtos/total/categoria')
          return data.data
     }
}