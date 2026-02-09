<template>
     <v-card class="pa-10 mx-auto" style="width: 50vw;">
          <div class="w-100 mb-10 d-flex align-center justify-space-between">
               <div class="d-flex align-center">
                    <HugeiconsIcon class="text-light" :stroke-width="2" :size="30" :icon="DashboardCircleIcon" />
                    <h1 class="ml-2">Categorias de Produtos</h1>
               </div>
               <v-btn color="main">Adicionar</v-btn>
          </div>
          <v-data-table :headers="produtoCategoriaHeaders" v-if="produtoCategoria" :items="produtoCategoria">

               <template #item.acoes="{ item }">
                    <MenuAcoes @editar="abrirEditar(item)" @excluir="abrirExcluir(item)" />
               </template>

          </v-data-table>
     </v-card>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue';
import { DashboardCircleIcon } from '@hugeicons/core-free-icons';
import { onMounted, ref } from 'vue';

import { usarAuxiliaresStore } from '@/stores/auxiliares.store';
import type { ProdutoCategoria } from '@/modules/cadastros/cadastros.types';
import MenuAcoes from '@/components/common/MenuAcoes.vue';

type Abas = 'produto_categoria'
const abaAtiva = ref<Abas>('produto_categoria')

const auxiliaresStore = usarAuxiliaresStore()

const produtoCategoria = ref<ProdutoCategoria[] | null>(null)
const produtoCategoriaHeaders = [
     { title: 'ID', value: 'id' },
     { title: 'Categoria', value: 'categoria' },
     { title: '', value: 'acoes', width: '5%' }
]

async function listarAuxiliares() {
     await auxiliaresStore.carregar()

     produtoCategoria.value = auxiliaresStore.produtoCategoria
}

onMounted(() => {
     listarAuxiliares()
})

</script>