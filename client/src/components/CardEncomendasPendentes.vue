<template>
     <v-card class="pa-10 d-flex flex-column">
          <div>
               <div class="d-flex align-center">
                    <HugeiconsIcon class="text-light" :icon="ShoppingCart02Icon" />
                    <h2 class="ml-2">Entregas do Mês</h2>
               </div>
               <div class="d-flex align-center justify-space-between mt-5">
                    <h2 class="f-regular">{{ tituloMes.mes }}, {{ tituloMes.ano }}</h2>
                    <div class="d-flex align-center">
                         <v-btn size="30" icon variant="tonal" class="mr-2" @click="mesAnterior">
                              <HugeiconsIcon :icon="ArrowLeft01Icon" />
                         </v-btn>
                         <v-btn size="30" icon color="main" @click="proximoMes">
                              <HugeiconsIcon :icon="ArrowRight01Icon" />
                         </v-btn>
                    </div>
               </div>
               <p class="mt-5">Você tem <b>{{ encomendasDoMes.length }}</b> entregas neste mês</p>

               <h3>Há {{ encomendasAtrasadas.length }} encomendas atrasadas</h3>

          </div>

          <v-list class="mt-5" height="450">
               <v-list-item v-if="encomendasDoMes.length" v-for="item in encomendasDoMes" :key="item.codigo"
                    class="pa-0">
                    <v-divider class="mx-5"></v-divider>
                    <div class="d-flex align-center no-border pa-5">
                         <div>
                              <h2 class="f-regular text-center">{{ item.data_prazo?.slice(8) }}</h2>
                              <p class="text-center">{{ tituloMes.mes_abreviado }}</p>
                         </div>
                         <v-divider class="mx-6 my-5" vertical />
                         <v-card class="pa-3 d-flex w-100" @click="abrirEncomenda(item.codigo)">
                              <div class="ml-1 align-start">
                                   <v-img class="flex-shrink-0" width="3vw" height="6vh" cover
                                        :key="item.produto_codigo + item.data_criacao"
                                        :src="`${api.defaults.baseURL}/arquivos/produtos/${item.produto_codigo}/1.webp?v=${Date.now()}`">
                                        <template #placeholder>
                                             <div class="d-flex align-center justify-center fill-height">
                                                  <v-progress-circular color="main" indeterminate size="36" />
                                             </div>
                                        </template>
                                        <template #error>
                                             <div
                                                  class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
                                                  <HugeiconsIcon :size="35" class="opacity-30"
                                                       :icon="ImageDelete01Icon" />
                                             </div>
                                        </template>
                                   </v-img>
                              </div>
                              <div class="ml-2" style="max-width: 65%;">
                                   <div class="d-flex align-center">
                                        <h3 class="text-truncate">
                                             {{ item.cliente_nome }}
                                        </h3>
                                   </div>
                                   <div class="d-flex align-center mt-1">
                                        <p class="text-truncate">
                                             {{ item.produto_nome }}
                                        </p>
                                   </div>
                              </div>
                         </v-card>
                    </div>
               </v-list-item>
               <v-list-item v-else-if="!encomendasDoMes.length" class="h-100">
                    <v-card class="pa-10 d-flex flex-column align-center justify-center" variant="tonal"
                         color="grey-lighten-1">
                         <HugeiconsIcon class="opacity-30" color="black" :size="150" :stroke-width="1.1"
                              :icon="SmileIcon" />
                         <h2 class="subText text-center f-regular text-black font-weight-regular mt-10">
                              Não há encomendas <b>pendentes</b> para este mês
                         </h2>
                    </v-card>
               </v-list-item>
          </v-list>

     </v-card>
</template>

<script setup lang="ts">
import type { EncomendaView } from '@/modules/encomendas/encomendas.types';
import { api } from '@/plugins/api';
import { HugeiconsIcon } from '@hugeicons/vue';
import { ArrowLeft01Icon, ArrowRight01Icon, ImageDelete01Icon, ShoppingCart02Icon, SmileIcon, Tag01Icon, UserCircleIcon } from '@hugeicons/core-free-icons';
import { computed, ref } from 'vue';
import router from '@/router';

const props = defineProps<{
     encomendas: EncomendaView[]
}>()

const mesAtual = ref(new Date())

const tituloMes = computed(() => {
     const data = mesAtual.value
     const mesCompleto = data.toLocaleString('pt-BR', { month: 'long' })
     const ano = data.getFullYear().toString()

     return {
          mes: mesCompleto.charAt(0).toUpperCase() + mesCompleto.slice(1),
          mes_abreviado: mesCompleto.charAt(0).toUpperCase() + mesCompleto.slice(1, 3),
          ano
     }
})

const encomendasDoMes = computed(() => {
     const mes = mesAtual.value.getMonth()
     const ano = mesAtual.value.getFullYear()

     return props.encomendas
          .filter(e => {
               if (!e.data_prazo) return false

               const data = new Date(e.data_prazo)
               return (
                    data.getMonth() === mes &&
                    data.getFullYear() === ano &&
                    !e.finalizado
               )
          })
          .sort((a, b) => {
               const dataA = new Date(a.data_prazo!).getTime()
               const dataB = new Date(b.data_prazo!).getTime()
               return dataA - dataB // crescente
          })
})

const encomendasAtrasadas = computed(() => {
     const inicioMesAtual = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
     )
     return props.encomendas.filter(e => {
          if (!e.data_prazo) return false

          const data = new Date(e.data_prazo)

          return (
               data < inicioMesAtual &&
               !e.finalizado
          )
     })
})

function proximoMes() {
     const d = new Date(mesAtual.value)
     d.setMonth(d.getMonth() + 1)
     mesAtual.value = d
}

function mesAnterior() {
     const d = new Date(mesAtual.value)
     d.setMonth(d.getMonth() - 1)
     mesAtual.value = d
}
function abrirEncomenda(codigo: string) {
     router.push({
          path: '/encomendas',
          query: {
               codigo: codigo
          }
     })
}

</script>
