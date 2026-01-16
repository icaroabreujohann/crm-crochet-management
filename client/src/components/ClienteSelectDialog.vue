<template>
     <v-dialog v-model="dialog" width="50vw">
          <v-card class="pa-10">
               <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                         <HugeiconsIcon class="text-light mr-2" :stroke-width="2" :size="30"
                              :icon="UserMultiple02Icon" />
                         <h1>Selecione um Cliente</h1>
                    </div>
                    <div class="w-33 mr-n15">
                         <v-text-field density="compact" variant="solo-filled" label="Pesquise por um cliente"
                              prepend-inner-icon="mdi-account-search-outline" hide-details v-model="filtroClientes">
                              <template #prepend-inner>
                                   <HugeiconsIcon class="subText" :stroke-width="2" :size="20" :icon="Search02Icon" />
                              </template>
                         </v-text-field>
                    </div>
                    <v-btn class="ml-n10" variant="tonal" @click="dialog = false" width="12%">
                         <HugeiconsIcon :size="18" :icon="CancelCircleIcon" class="mr-1" />
                         Cancelar
                    </v-btn>
               </div>
               <v-card v-if="clienteStore.carregando" width="100%"
                    class="pa-10 d-flex align-center flex-column justify-center mt-5 no-border">
                    <v-progress-circular color="main" indeterminate :size="83" :width="6"></v-progress-circular>
                    <p class="subText mt-3">Carregando Clientes</p>
               </v-card>
               <v-data-table class="mt-5" v-else-if="clienteStore.carregado" :headers="clientesHeaders"
                    @click:row="selecionarCliente" :items="clientesFiltrados" item-props>
               </v-data-table>
          </v-card>
     </v-dialog>
</template>


<script setup lang="ts">
import type { Cliente } from '@/modules/clientes/clientes.types';
import { usarClienteStore } from '@/stores/clientes.store';
import { CancelCircleIcon, Search02Icon, UserMultiple02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';
import { onMounted, ref } from 'vue';
import { computed } from 'vue';


const props = defineProps<{
     modelValue: boolean
}>()

const emit = defineEmits<{
     (e: 'update:modelValue', value: boolean): void
     (e: 'select', cliente: Cliente): void
}>()

const dialog = computed({
     get: () => props.modelValue,
     set: (value) => emit('update:modelValue', value)
})

const clienteStore = usarClienteStore()

const clientes = computed(() => clienteStore.clientes)
const clientesHeaders = [
     { title: 'Nome', value: 'nome', sortable: true },
     { title: 'Instagram', value: 'instagram', sortable: true },
     { title: 'Telefone', value: 'telefone', sortable: true },
]
const filtroClientes = ref('')
const clientesFiltrados = computed(() => {
     if (!filtroClientes.value) return clientes.value

     const termo = filtroClientes.value.toLowerCase()

     return clientes.value.filter(cliente =>
          cliente.nome.toLowerCase().includes(termo) ||
          cliente.instagram?.toLowerCase().includes(termo) ||
          cliente.telefone?.includes(termo)
     )
})

function selecionarCliente(event: Event, { item }: { item: Cliente }) {
     emit('select', item)
}

onMounted(() => {
     clienteStore.buscaClientes()
})

</script>

<style>
.v-data-table__tr:hover {
     background-color: rgba(var(--v-theme-on-surface), 0.06);
}
</style>