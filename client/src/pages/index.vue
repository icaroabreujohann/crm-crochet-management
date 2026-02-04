<template>
     <v-container class="pa-0" fluid>
          <header class="d-flex align-center mb-6">
               <HugeiconsIcon class="text-light" :stroke-width="2" :size="36" :icon="ShoppingBasket01Icon" />
               <h1 class="ml-2">Início</h1>
          </header>
          <v-row dense>
               <v-col cols="12" md="6" lg="8" class="pr-5">
                    <v-row style="height: 44% !important;">
                         <v-col cols="12">
                              <CardEncomendasDados v-if="dadosEncomendasFaturamentoMensal"
                                   :dados="dadosEncomendasFaturamentoMensal"/>
                         </v-col>
                    </v-row>
                    <v-row style="height: 44% !important;">
                         <v-col cols="12">
                              <ChartsEncomendasFaturamento v-if="dadosEncomendasFaturamentoMensal"
                                   :dados="dadosEncomendasFaturamentoMensal" />
                         </v-col>
                    </v-row>
               </v-col>
               <v-col cols="12" md="6" lg="4">
                    <CardEncomendasPendentes v-if="encomendas" :encomendas="encomendas" />
               </v-col>
          </v-row>
     </v-container>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue';
import { ShoppingBasket01Icon } from '@hugeicons/core-free-icons';
import { usarClienteStore } from '@/stores/clientes.store';
import { usarProdutoStore } from '@/stores/produtos.store';
import { usarEncomendaStore } from '@/stores/encomendas.store';
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { EncomendasFaturamentoMensal } from '@/modules/relatorios/relatorios.types';
import { RelatoriosServices } from '../modules/relatorios/relatorios.services';
import ChartsEncomendasFaturamento from '@/components/ChartsEncomendasFaturamento.vue';
import CardEncomendasPendentes from '@/components/CardEncomendasPendentes.vue';

const clienteStore = usarClienteStore()
const produtoStore = usarProdutoStore()
const encomendaStore = usarEncomendaStore()

const clientes = storeToRefs(clienteStore)
const produtos = storeToRefs(produtoStore)
const { encomendas } = storeToRefs(encomendaStore)

const dadosEncomendasFaturamentoMensal = ref<EncomendasFaturamentoMensal[] | null>(null)

async function listarRelatorios() {
     const encomendasFaturamentoMensal = await RelatoriosServices.listarEncomendasFaturamentoMensal()
     dadosEncomendasFaturamentoMensal.value = encomendasFaturamentoMensal
}

onMounted(() => {
     clienteStore.buscaClientes()
     produtoStore.buscaProdutos()
     encomendaStore.buscaEncomendas()
     listarRelatorios()
})



</script>