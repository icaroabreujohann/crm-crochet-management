import { defineStore } from 'pinia'
import { CadastrosServices } from '@/modules/cadastros/cadastros.services'
import type { ProdutoCategoria, TipoMaterial, UnidadeMedida } from '@/modules/cadastros/cadastros.types'
import type { ProdutoMaterialCriarDTO } from '@/modules/produtos/produtos.types'

interface AuxiliaresState {
     tiposMaterial: TipoMaterial[]
     unidadesMedida: UnidadeMedida[]
     produtoCategoria: ProdutoCategoria[]
}

export const usarAuxiliaresStore = defineStore('auxiliares', {
     state: ():AuxiliaresState => ({
          tiposMaterial: [],
          unidadesMedida: [],
          produtoCategoria: []
     }),

     actions: {
          async carregar() {
               if (this.tiposMaterial.length) return

               const [tipos, unidades, produto_categoria] = await Promise.all([
                    CadastrosServices.listarTiposMateriais(),
                    CadastrosServices.listarUnidadesMedida(),
                    CadastrosServices.listarProdutoCategorias()
               ])

               this.tiposMaterial = tipos
               this.unidadesMedida = unidades
               this.produtoCategoria = produto_categoria
          },

          async salvarProdutoCategoria(form: ProdutoMaterialCriarDTO) {
               await CadastrosServices
          }
     }
})