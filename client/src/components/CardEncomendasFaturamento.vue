<template>
     <v-card class="pa-10 h-100">
          <Bar class="no-border" :data="chartData" :options="chartOptions" />
     </v-card>
</template>

<script setup lang="ts">
import {
     Chart as ChartJS,
     CategoryScale,
     LinearScale,
     BarElement,
     Tooltip,
     Legend
} from 'chart.js'

import { Bar } from 'vue-chartjs'
import { computed } from 'vue'
import type { EncomendasFaturamentoMensal } from '@/modules/relatorios/relatorios.types'

ChartJS.register(
     CategoryScale,
     LinearScale,
     BarElement,
     Tooltip,
     Legend
)


const props = defineProps<{
     dados: EncomendasFaturamentoMensal[]
}>()

const labels = computed(() =>
     props.dados.map(item =>
          new Date(item.periodo).toLocaleDateString('pt-BR', {
               month: 'short',
               year: 'numeric'
          })
     )
)

const chartData = computed(() => ({
     labels: labels.value,
     datasets: [
          {
               label: 'Faturamento',
               data: props.dados.map(d => Number(d.faturamento)),
               backgroundColor: 'rgba(231, 157, 175, 0.5)',
               borderRadius: 10,
               barPercentage: 0.2,
               categoryPercentage: 1,
               order: 2,          // atrás
               stack: 'total'
          },
          {
               label: 'Lucro',
               data: props.dados.map(d => Number(d.lucro)),
               backgroundColor: 'rgba(71, 26, 60, 1)',
               borderRadius: 10,
               barPercentage: 0.2,
               categoryPercentage: 1,
               order: 1,          // na frente
               stack: 'total'
          }
     ]
}))

const chartOptions = {
     responsive: true,
     maintainAspectRatio: false,
     plugins: {
          legend: {
               position: 'top'
          },
          tooltip: {
               callbacks: {
                    label: (ctx: any) =>
                         `${ctx.dataset.label}: R$ ${ctx.raw.toFixed(2)}`
               }
          }
     },
     scales: {
          x: {
               stacked: true
          },
          y: {
               stacked: false,
               ticks: {
                    callback: (value: number) =>
                         `R$ ${value.toFixed(2)}`
               }
          }
     }
}
</script>

<style scoped>
.chart-wrapper {
     height: 100%;
}
</style>
