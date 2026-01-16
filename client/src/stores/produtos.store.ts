import { ProdutosServices } from "@/modules/produtos/produtos.services";
import type { ProdutoView } from "@/modules/produtos/produtos.types";
import { defineStore } from "pinia";


interface ProdutoStore {
     produtos: ProdutoView[],
     carregando: boolean,
     carregado: boolean
}

export const usarProdutoStore = defineStore('produtos', {
     state: (): ProdutoStore => ({
          produtos: [],
          carregando: true,
          carregado: false
     }),

     actions: {
          async buscaProdutos() {
               if(this.carregado) return

               this.carregando = true
               this.produtos = await ProdutosServices.listar()
               this.carregando = false
               this.carregado = true
          }
     }
})