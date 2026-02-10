import { defineStore } from 'pinia'
import { CadastrosServices } from '@/modules/cadastros/cadastros.services'
import type { ProdutoCategoria, ProdutoCategoriaForm, TipoMaterial, UnidadeMedida } from '@/modules/cadastros/cadastros.types'
import type { ProdutoForm, ProdutoMaterialCriarDTO } from '@/modules/produtos/produtos.types'
import { usarProdutoStore } from './produtos.store'

interface AuxiliaresState {
     tiposMaterial: TipoMaterial[]
     unidadesMedida: UnidadeMedida[]
     produtoCategoria: ProdutoCategoria[]
     carregando: boolean,
     carregado: boolean
}

export const usarAuxiliaresStore = defineStore('auxiliares', {
     state: (): AuxiliaresState => ({
          tiposMaterial: [],
          unidadesMedida: [],
          produtoCategoria: [],
          carregando: false,
          carregado: false
     }),

     actions: {
          async carregar(forcar: boolean = false) {
               if (this.carregado && !forcar) return

               this.carregando = true
               const [tipos, unidades, produto_categoria] = await Promise.all([
                    CadastrosServices.listarTiposMateriais(),
                    CadastrosServices.listarUnidadesMedida(),
                    CadastrosServices.listarProdutoCategorias()
               ])
               this.carregando = false
               this.carregado = true

               this.tiposMaterial = tipos
               this.unidadesMedida = unidades
               this.produtoCategoria = produto_categoria
          },

          async salvarProdutoCategoria(form: Partial<ProdutoCategoriaForm>) {
               const categoriaSalva = await CadastrosServices.salvarProdutoCategoria(form)
               this.produtoCategoria = await CadastrosServices.listarProdutoCategorias()

               const produtoStore = usarProdutoStore()
               await produtoStore.buscaProdutos(true)
               
               return categoriaSalva
          },

          async excluirProdutoCategoria(id: number) {
               const categoriaExcluida = await CadastrosServices.excluirProdutoCategoria(id)
               this.produtoCategoria = await CadastrosServices.listarProdutoCategorias()
               return categoriaExcluida
          }
     }
})