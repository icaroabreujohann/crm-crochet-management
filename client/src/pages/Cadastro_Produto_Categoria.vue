<template>
     <v-card class="pa-10 mx-auto" style="width: 50vw;">
          <div class="w-100 mb-10 d-flex align-center justify-space-between">
               <div class="d-flex align-center">
                    <HugeiconsIcon class="text-light" :stroke-width="2" :size="30" :icon="DashboardCircleIcon" />
                    <h1 class="ml-2">Categorias de Produtos</h1>
               </div>
               <v-btn color="main" @click="abrirCriar">Adicionar</v-btn>
          </div>
          <v-data-table :headers="produtoCategoriaHeaders" v-if="produtoCategoria" :items="produtoCategoria">

               <template #item.acoes="{ item }">
                    <MenuAcoes @editar="abrirEditar(item)" @excluir="abrirExcluir(item)" />
               </template>

          </v-data-table>
     </v-card>

     <CadastroProdutoCategoriaForm :produto_categoria="produtoCategoriaSelecionado" v-model="dialogForm"
          @salvo="salvarCategoria" />
     <ConfirmaExclusao v-model="dialogConfirmaExclusao" v-if="produtoCategoriaSelecionado"
          :identificador="produtoCategoriaSelecionado.id" :tipo="'produto categoria'" @excluir="excluirCategoria" />
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue';
import { DashboardCircleIcon } from '@hugeicons/core-free-icons';
import { onMounted, ref } from 'vue';

import { usarAuxiliaresStore } from '@/stores/auxiliares.store';
import type { ProdutoCategoria, ProdutoCategoriaForm } from '@/modules/cadastros/cadastros.types';
import MenuAcoes from '@/components/common/MenuAcoes.vue';
import CadastroProdutoCategoriaForm from '@/components/CadastroProdutoCategoriaForm.vue';
import ConfirmaExclusao from '@/components/common/ConfirmaExclusao.vue';
import { usarFeedbackStore } from '@/stores/feedbacks.store';
import { storeToRefs } from 'pinia';

const feedback = usarFeedbackStore()
const auxiliaresStore = usarAuxiliaresStore()
const { produtoCategoria } = storeToRefs(auxiliaresStore)

const produtoCategoriaHeaders = [
     { title: 'ID', value: 'id' },
     { title: 'Categoria', value: 'categoria' },
     { title: '', value: 'acoes', width: '5%' }
]
const produtoCategoriaSelecionado = ref<ProdutoCategoria | null>(null)
const dialogForm = ref<boolean>(false)
const dialogConfirmaExclusao = ref<boolean>(false)

function abrirCriar() {
     produtoCategoriaSelecionado.value = null
     dialogForm.value = true
}

function abrirEditar(categoria: ProdutoCategoria) {
     produtoCategoriaSelecionado.value = categoria
     dialogForm.value = true
}

function abrirExcluir(categoria: ProdutoCategoria) {
     produtoCategoriaSelecionado.value = categoria
     dialogConfirmaExclusao.value = true
}

async function salvarCategoria(form: ProdutoCategoriaForm) {
     await auxiliaresStore.salvarProdutoCategoria(form)
     dialogForm.value = false
     produtoCategoriaSelecionado.value = null
     feedback.sucesso('Categoria criada/editada com sucesso!')
}

async function excluirCategoria(identificador: string | number) {
     const id = Number(identificador)

     await auxiliaresStore.excluirProdutoCategoria(id)
     dialogConfirmaExclusao.value = false
     produtoCategoriaSelecionado.value = null
     feedback.sucesso('Categoria exluida com sucesso!')
}

async function listarAuxiliares() {
     await auxiliaresStore.carregar()

     produtoCategoria.value = auxiliaresStore.produtoCategoria
}

onMounted(() => {
     listarAuxiliares()
})

</script>