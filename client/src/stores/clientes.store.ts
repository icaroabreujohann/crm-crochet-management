import { ClientesServices } from "@/modules/clientes/clientes.services";
import type { Cliente, ClienteForm } from "@/modules/clientes/clientes.types";
import { defineStore } from "pinia";


interface ClienteStore {
     clientes: Cliente[],
     carregando: boolean,
     carregado: boolean
}

export const usarClienteStore = defineStore('clientes', {
     state: (): ClienteStore => ({
          clientes: [],
          carregando: false,
          carregado: false
     }),

     actions: {
          async buscaClientes(forcar: boolean = false) {
               if(this.carregado && !forcar) return

               this.carregando = true
               const lista = await ClientesServices.listar()
               this.clientes = [...lista]
               this.carregando = false
               this.carregado = true
          },

          async salvarCliente(form: ClienteForm) {
               await ClientesServices.salvar(form)
               await this.buscaClientes(true)
          },

          async excluirCliente(id: number) {
               await ClientesServices.excluir(id)
               await this.buscaClientes(true)
          }
     }
})