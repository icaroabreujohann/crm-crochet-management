<template>
     <v-card class="pa-10" style="height: 410px;">
          <div class="d-flex align-center justify-space-between mb-7">
               <div class="d-flex align-center">
                    <HugeiconsIcon class="text-light" :icon="Chart01Icon" />
                    <h2 class="ml-2">Faturamento</h2>
               </div>
               <div class="d-flex">
                    <div class="mr-7">
                         <div class="d-flex align-center">
                              <v-sheet
                                   width="14"
                                   height="14"
                                   rounded="circle"
                                   color="light"
                              ></v-sheet>
                              <p class="ml-1 subText">Faturamento</p>
                         </div>
                         <div class="d-flex align-center">
                              <v-sheet
                                   width="14"
                                   height="14"
                                   rounded="circle"
                                   color="main"
                              ></v-sheet>
                              <p class="ml-1 subText">Lucro</p>
                         </div>
                    </div>
                    <v-select density="compact" :items="dadosAnosExistentes" v-model="filtroDados" variant="solo-filled" hide-details></v-select>
               </div>
          </div>
          <div style="height: 85%;">
               <Bar class="no-border" :data="chartData" :options="chartOptions" />
          </div>
     </v-card>
</template>

<script setup lang="ts">
import {
     Chart as ChartJS,
     CategoryScale,
     LinearScale,
     BarElement,
     Tooltip,
     Legend,
     type ChartOptions
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'
import type { EncomendasFaturamentoMensal } from '@/modules/relatorios/relatorios.types'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Chart01Icon } from '@hugeicons/core-free-icons'
import { ref } from 'vue'

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
     dadosFiltrados.value.map(item => {
          const mes = new Date(item.periodo).toLocaleDateString('pt-BR', {
               month: 'short',
          })

          return mes.charAt(0).toUpperCase() + mes.slice(1).replace('.', '')
     }
     )
)

const chartData = computed(() => ({
     labels: labels.value,
     datasets: [
          {
               label: 'Faturamento',
               data: dadosFiltrados.value.map(d => Number(d.faturamento)),
               backgroundColor: 'rgba(231, 157, 175, 1',
               borderRadius: 5,
               barPercentage: 0.9,
               categoryPercentage: 0.5,
               order: 2,
          },
          {
               label: 'Lucro',
               data: dadosFiltrados.value.map(d => Number(d.lucro)),
               backgroundColor: 'rgba(71, 26, 60, 1)',
               borderRadius: 5,
               barPercentage: 0.9,
               categoryPercentage: 0.5,
               order: 1,
          }
     ]
}))

const chartOptions: ChartOptions<'bar'> = {
     responsive: true,
     maintainAspectRatio: false,
     plugins: {
          legend: {
               display: false
          },
          tooltip: {
               usePointStyle: true,
               boxWidth: 6,
               boxHeight: 6,
               boxPadding: 4,
               callbacks: {
                    label: (context) =>
                         `${context.dataset.label}: R$ ${Number(context.parsed.y).toFixed(2)}`
               }
          }
     },
     scales: {
          x: {
               stacked: false,
               grid: {
                    display: false,
                    offset: false
               },
               border: {
                    display: false
               },
               ticks: {
                    padding: 0, 
                    autoSkip: true,
                    maxRotation: 0,
                    minRotation: 0,
                    font: {
                         size: 14,
                         family: 'f-semi'
                    }
               }
          },
          y: {
               stacked: false,
               grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)',
                    lineWidth: 2,
                    offset: false
               },
               ticks: {
                    padding: 10,
                    maxTicksLimit: 5,
                    callback: (value) =>
                         `${Number(value).toFixed(0).replace('.', ',')}`,
                    font: {
                         size: 14,
                         family: 'f-semi'
                    }
               },
               border: {
                    display: false
               }
          }
     }
}

const dadosAnosExistentes = computed(() => {
     const anos = props.dados.map(i => {
          return new Date(i.periodo).getFullYear()
     })
     return [...new Set(anos)].sort((a, b) => b - a)
})

const filtroDados = ref(new Date().getFullYear())
const dadosFiltrados = computed(() => {
     return props.dados.filter(d => {
          return new Date(d.periodo).getFullYear() == filtroDados.value
     })
})
</script>