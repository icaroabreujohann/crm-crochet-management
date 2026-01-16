import { ClientesServices } from "@/modules/clientes/clientes.services";
import type { Cliente } from "@/modules/clientes/clientes.types";
import { defineStore } from "pinia";


interface ClienteStore {
     clientes: Cliente[],
     carregando: boolean,
     carregado: boolean
}

export const usarClienteStore = defineStore('clientes', {
     state: (): ClienteStore => ({
          clientes: [],
          carregando: true,
          carregado: false
     }),

     actions: {
          async buscaClientes() {
               if(this.carregado) return

               this.carregando = true
               this.clientes = await ClientesServices.listar()
               this.carregando = false
               this.carregado = true
          }
     }
})