<template>
     <v-card class="pa-7">
          <div class="d-flex align-center mb-5">
                <HugeiconsIcon class="text-light" :icon="AnalyticsUpIcon" />
               <h2 class="ml-2">Categorias mais vendidas</h2>
          </div>
          <v-data-table :headers="dadosHeaders" :items="props.dados" hide-default-footer height="250px">
               <template #item.preco_medio="{ item }">
                    <p>R${{ String(item.preco_medio).replace('.', ',') }}</p>
               </template>
               <template #item.lucro_medio="{ item }">
                    <p>R${{ String(item.lucro_medio).replace('.', ',') }}</p>
               </template>
               <template #item.margem_lucro_percent="{ item }">
                    <p>{{ item.margem_lucro_percent }}%</p>
               </template>
          </v-data-table>
     </v-card>
</template>

<script setup lang="ts">
import type { ProdutoCategoriaTotal } from '@/modules/relatorios/relatorios.types';
import { AnalyticsUpIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';


const props = defineProps<{
     dados: ProdutoCategoriaTotal[]
}>()

const dadosHeaders = [
     { title: 'Categoria', value: 'categoria' },
     { title: 'Total', value: 'total_vendas' },
     { title: 'Preço Médio', value: 'preco_medio' },
     { title: 'Lucro Médio', value: 'lucro_medio' },
     { title: 'Margem Lucro', value: 'margem_lucro_percent' }

]
</script>