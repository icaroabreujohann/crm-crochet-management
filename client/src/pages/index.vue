<template>
     <v-container class="pa-10 mx-auto" style="width: 80vw;">
          <v-row class="">
               <v-col cols="8" class="d-flex flex-column">
                    <div>
                         <CardProdutoCategoria v-if="dadosProdutoCategoriaTotal" :dados="dadosProdutoCategoriaTotal" />
                    </div>

                    <div class="flex-grow-1 mt-4">
                         <ChartsEncomendasFaturamento v-if="dadosEncomendasFaturamentoMensal"
                              :dados="dadosEncomendasFaturamentoMensal" />
                    </div>
               </v-col>

               <v-col cols="4">
                    <CardEncomendasPendentes class="h-100" v-if="encomendas" :encomendas="encomendas" />
               </v-col>
          </v-row>
     </v-container>
</template>

<script setup lang="ts">
import { usarClienteStore } from '@/stores/clientes.store';
import { usarProdutoStore } from '@/stores/produtos.store';
import { usarEncomendaStore } from '@/stores/encomendas.store';
import { onMounted, ref } from 'vue';
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