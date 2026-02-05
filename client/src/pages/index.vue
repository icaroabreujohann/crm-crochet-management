<template>
     <v-container class="pa-0">
          <v-row dense>
               <v-col cols="12" md="6" lg="8" class="pr-5">
                    <v-row style="height: 44% !important;">
                         <v-col cols="12">
                              <CardProdutoCategoria v-if="dadosProdutoCategoriaTotal" :dados="dadosProdutoCategoriaTotal"/>
                         </v-col>
                    </v-row>
                    <v-row>
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
import type { EncomendasFaturamentoMensal, ProdutoCategoriaTotal } from '@/modules/relatorios/relatorios.types';
import { RelatoriosServices } from '../modules/relatorios/relatorios.services';
import ChartsEncomendasFaturamento from '@/components/ChartsEncomendasFaturamento.vue';
import CardEncomendasPendentes from '@/components/CardEncomendasPendentes.vue';
import CardProdutoCategoria from '@/components/CardProdutoCategoria.vue';

const clienteStore = usarClienteStore()
const produtoStore = usarProdutoStore()
const encomendaStore = usarEncomendaStore()

const clientes = storeToRefs(clienteStore)
const produtos = storeToRefs(produtoStore)
const { encomendas } = storeToRefs(encomendaStore)

const dadosEncomendasFaturamentoMensal = ref<EncomendasFaturamentoMensal[] | null>(null)
const dadosProdutoCategoriaTotal = ref<ProdutoCategoriaTotal[] | null>(null)

async function listarRelatorios() {
     const encomendasFaturamentoMensal = await RelatoriosServices.listarEncomendasFaturamentoMensal()
     const produtoCategoriaTotal = await RelatoriosServices.listarProdutoCategoriaTotal()

     dadosEncomendasFaturamentoMensal.value = encomendasFaturamentoMensal
     dadosProdutoCategoriaTotal.value = produtoCategoriaTotal
}

onMounted(() => {
     clienteStore.buscaClientes()
     produtoStore.buscaProdutos()
     encomendaStore.buscaEncomendas()
     listarRelatorios()
})



</script>