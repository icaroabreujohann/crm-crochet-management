<template>
     <div class="d-flex align-center">
          <HugeiconsIcon class="text-light" :stroke-width="2" :size="36" :icon="ShoppingBasket01Icon" />
          <h1 class="ml-2">Início</h1>
     </div>
     <v-calendar class="mt-5" view="month" :events="eventos">
          <template #day-label="{ day }">
               <p class="text-start ml-4 mt-3 subText">{{ day }}</p>
          </template>
          
     </v-calendar>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue';
import { ShoppingBasket01Icon } from '@hugeicons/core-free-icons';
import { usarClienteStore } from '@/stores/clientes.store';
import { usarProdutoStore } from '@/stores/produtos.store';
import { usarEncomendaStore } from '@/stores/encomendas.store';
import { onMounted, ref } from 'vue';
import { useAgendaEncomendas } from '@/composables/useAgendaEncomendas';
import { storeToRefs } from 'pinia';

const clienteStore = usarClienteStore()
const produtoStore = usarProdutoStore()
const encomendaStore = usarEncomendaStore()

const clientes = storeToRefs(clienteStore)
const produtos = storeToRefs(produtoStore)
const { encomendas } = storeToRefs(encomendaStore)

const { eventos } = useAgendaEncomendas(encomendas)

onMounted(() => {
     clienteStore.buscaClientes()
     produtoStore.buscaProdutos()
     encomendaStore.buscaEncomendas()
})



</script>