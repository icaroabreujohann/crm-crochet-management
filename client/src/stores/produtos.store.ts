import { ProdutosServices } from "@/modules/produtos/produtos.services";
import type { ProdutoForm, ProdutoView } from "@/modules/produtos/produtos.types";
import { defineStore } from "pinia";


interface ProdutoStore {
     produtos: ProdutoView[],
     carregando: boolean,
     carregado: boolean
}

export const usarProdutoStore = defineStore('produtos', {
     state: (): ProdutoStore => ({
          produtos: [],
          carregando: false,
          carregado: false
     }),

     actions: {
          async buscaProdutos(forcar: boolean = false) {
               if(this.carregado && !forcar) return

               this.carregando = true
               const lista = await ProdutosServices.listar()
               this.produtos = [...lista]
               this.carregando = false
               this.carregado = true
          },

          async listarProdutoPorCodigo(codigo: string) {
               return await ProdutosServices.listarPorCodigo(codigo)
          },

          async salvarProduto(form: Partial<ProdutoForm>) {
               await ProdutosServices.salvar(form)
               await this.buscaProdutos(true)
          },

          async excluirProduto(codigo: string) {
               await ProdutosServices.excluir(codigo)
               await this.buscaProdutos(true)
          }
     }
})