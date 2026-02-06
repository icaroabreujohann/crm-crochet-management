<template>
          <div class="d-flex align-center">
               <HugeiconsIcon class="text-light" :stroke-width="2" :size="30" :icon="FolderManagementIcon" />
               <h1 class="ml-2">Cadastros Gerais</h1>
          </div>
          <v-tabs color="lighr" v-model="abaAtiva" align-tabs="start" class="mt-5">
               <v-tab value="produto_categoria">
                    <template #prepend>
                         <HugeiconsIcon :size="20" :icon="Tag01Icon" />
                    </template>
                    Produto Categoria
               </v-tab>
          </v-tabs>
          <v-tabs-window class="mt-10" v-model="abaAtiva">
               <v-tabs-window-item value="produto_categoria">
                    <v-data-table v-if="produtoCategoria" :items="produtoCategoria"></v-data-table>
               </v-tabs-window-item>
          </v-tabs-window>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue';
import { FolderManagementIcon, Settings02Icon, Tag01Icon } from '@hugeicons/core-free-icons';
import { onMounted, ref } from 'vue';

import { usarAuxiliaresStore } from '@/stores/auxiliares.store';
import type { ProdutoCategoria } from '@/modules/cadastros/cadastros.types';

type Abas = 'produto_categoria'
const abaAtiva = ref<Abas>('produto_categoria')

const auxiliaresStore = usarAuxiliaresStore()

const produtoCategoria = ref<ProdutoCategoria[] | null>(null)


async function listarAuxiliares() {
     await auxiliaresStore.carregar()

     produtoCategoria.value = auxiliaresStore.produtoCategoria
}

onMounted(() => {
     listarAuxiliares()
})

</script>