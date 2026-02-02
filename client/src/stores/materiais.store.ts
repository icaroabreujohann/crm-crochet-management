import { defineStore } from 'pinia'
import { MateriaisServices } from '@/modules/materiais/materiais.services'
import type { MaterialCompleto, MaterialForm } from '@/modules/materiais/materiais.types'

interface MaterialStore {
     materiais: MaterialCompleto[],
     carregando: boolean,
     carregado: boolean
}

export const usarMaterialStore = defineStore('materiais', {
     state: (): MaterialStore => ({
          materiais: [],
          carregando: true,
          carregado: false
     }),

     actions: {
          async buscarMateriais(forcar: boolean = false) {
               if(this.carregado && !forcar) return

               this.carregando = true
               const lista = await MateriaisServices.listar()
               this.materiais = [...lista]
               this.carregando = false
               this.carregado = true
          },

          async salvar(form: MaterialForm){
               await MateriaisServices.salvar(form)
               await this.buscarMateriais(true)
          },

          async excluir(codigo: string) {
               await MateriaisServices.excluir(codigo)
               await this.buscarMateriais(true)
          }
     }
})