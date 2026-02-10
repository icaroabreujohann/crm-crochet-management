<template>
     <v-card class="pa-10 mx-auto" style="width: 80vw;">
          <div class="w-100 mb-5 d-flex align-end justify-space-between">
               <div class="d-flex align-center">
                    <HugeiconsIcon class="text-light" :stroke-width="2" :size="30" :icon="Tag01Icon" />
                    <h1 class="ml-2">Produtos</h1>
               </div>
               <div class="d-flex align-end w-50 justify-end">
                    <div class="w-50">
                         <v-text-field density="compact" class="mr-3" variant="solo-filled" label="Pesquise por um produto"
                              prepend-inner-icon="mdi-account-search-outline" hide-details v-model="filtroProdutos">
                              <template #prepend-inner>
                                   <HugeiconsIcon class="subText" :stroke-width="2" :size="20" :icon="Search02Icon" />
                              </template>
                         </v-text-field>
                    </div>
                    <v-btn color="main" @click="abrirCriar()">Adicionar</v-btn>
               </div>
          </div>
          <v-row class="mt-10">
               <v-col v-if="produtos.length > 0" cols="12" xl="4" lg="6" v-for="(produto, index) in produtosFiltrados"
                    :key="produto.codigo">
                    <v-card class="pa-5" @click="abrirEditar(produto)">
                         <div class="d-flex">
                              <div class="mr-3">
                                   <CardImagem :width="'100px'" :height="'100px'" :tipo="'produtos'" :codigo="produto.codigo" />
                              </div>
                              <div>
                                   <h2>{{ produto.nome }}</h2>
                                   <v-chip class="mt-1" color="main">
                                        <HugeiconsIcon :size="18" :icon="TagsIcon" />
                                        <p class="ml-1">{{ produto.categoria_nome }}</p>
                                   </v-chip>
                              </div>
                         </div>
                         <div class="d-flex align-center justify-space-between mt-5">
                              <div>
                                   <p class="subText">Preço</p>
                                   <h1 class="f-regular">R$ {{ substituiPontoPorVirgula(produto.preco) }}</h1>
                              </div>
                              <div v-if="produto.tempo_medio">
                                   <p class="subText">Tempo Médio</p>
                                   <h1 class="f-regular">{{ produto.tempo_medio.horas }}h{{ produto.tempo_medio.minutos }}m
                                   </h1>
                              </div>
                         </div>
                    </v-card>
               </v-col>
               <v-col cols="12" v-if="produtos.length == 0">
                    <v-card class="pa-10 d-flex align-center justify-center flex-column">
                         <HugeiconsIcon :stroke-width="1" class="opacity-20" :size="150" :icon="Sad01Icon" />
                         <h2 class="f-regular text-black opacity-30 mt-5 text-center">Ainda não há nenhum <br> produto
                              cadastrado
                         </h2>
                    </v-card>
               </v-col>
          </v-row>
     </v-card>

     <ProdutoFormDialog @excluir="excluirProduto" v-model="dialogProdutoForm" @salvo="salvarProduto"
          :produto="produtoSelecionado" />
</template>

<script lang="ts" setup>
import type { ProdutoView, ProdutoForm } from '@/modules/produtos/produtos.types';
import { computed, onMounted, ref } from 'vue';
import { usarFeedbackStore } from '@/stores/feedbacks.store';

import { HugeiconsIcon } from '@hugeicons/vue';
import { Sad01Icon, Search02Icon, Tag01Icon, TagsIcon } from '@hugeicons/core-free-icons';
import { substituiPontoPorVirgula } from '@/utils/substituirPontoPorVirgula';
import ProdutoFormDialog from '@/components/ProdutoFormDialog.vue';
import { normalizarTextoBusca } from '@/utils/normalizarTextoBusca';
import { storeToRefs } from 'pinia';
import { usarProdutoStore } from '@/stores/produtos.store';

const feedback = usarFeedbackStore()

const produtoStore = usarProdutoStore()
const { produtos } = storeToRefs(produtoStore)
const produtoSelecionado = ref<ProdutoView | null>(null)

const filtroProdutos = ref<string>('')
const produtosFiltrados = computed(() => {
     if (!filtroProdutos.value || filtroProdutos.value == '') return produtos.value

     const termos = normalizarTextoBusca(filtroProdutos.value).split(/\s+/)

     return produtos.value.filter(p => {
          const nome = normalizarTextoBusca(p.nome)
          return termos.every(termo => nome.includes(termo))
     })
})

const dialogProdutoForm = ref(false)

async function listarProdutos() {
     await produtoStore.buscaProdutos()
}

async function salvarProduto(produto: Partial<ProdutoForm>) {
     await produtoStore.salvarProduto(produto)
     dialogProdutoForm.value = false
     feedback.sucesso('Produto criado/editado com sucesso')
}

async function excluirProduto(codigo: string | number) {
     await produtoStore.excluirProduto(String(codigo))
     dialogProdutoForm.value = false
     feedback.sucesso('Produto excluído com sucesso')
}

function abrirCriar() {
     produtoSelecionado.value = null
     dialogProdutoForm.value = true
}

async function abrirEditar(produto: ProdutoView) {
     const produtoCompleto = await produtoStore.listarProdutoPorCodigo(produto.codigo)
     produtoSelecionado.value = produtoCompleto
     dialogProdutoForm.value = true
}

onMounted(() => {
     listarProdutos()
})

</script>