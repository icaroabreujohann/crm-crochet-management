import { EncomendasServices } from "@/modules/encomendas/encomendas.services";
import type { EncomendaForm, EncomendaView } from "@/modules/encomendas/encomendas.types";
import { defineStore } from "pinia";


interface EncomendaStore {
     encomendas: EncomendaView[],
     carregando: boolean,
     carregado: boolean
}

export const usarEncomendaStore = defineStore('encomendas', {
     state: (): EncomendaStore => ({
          encomendas: [],
          carregando: false,
          carregado: false
     }),

     actions: {
          async buscaEncomendas(forcar: boolean = false) {
               if (this.carregado && !forcar) return

               this.carregando = true
               const lista = await EncomendasServices.listar()
               this.encomendas = [...lista]
               this.carregando = false
               this.carregado = true
          },

          async salvarEncomenda(form: Partial<EncomendaForm>) {
               await EncomendasServices.salvar(form)
               await this.buscaEncomendas(true)
          },

          async excluirEncomenda(codigo: string) {
               await EncomendasServices.excluir(codigo)
               this.buscaEncomendas(true)
          }

     }
})