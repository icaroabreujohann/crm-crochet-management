<template>
     <div class="w-100 mb-5 d-flex align-end justify-space-between">
          <h1 class="mb-n2">Clientes</h1>
          <div class="d-flex align-end w-50 justify-end">
               <div class="w-50">
                    <v-text-field
                         density="compact"
                         class="mr-3"
                         variant="solo-filled"
                         label="Pesquise por um cliente"
                         prepend-inner-icon="mdi-account-search-outline"
                    />
               </div>
               <v-btn color="main" @click="">Adicionar</v-btn>
          </div>
     </div>

     <v-data-table
          :items="clientes"
          :headers="clientesHeaders"
     >
          <template #item.acoes="{ item }">
               <MenuAcoes/>
          </template>
     </v-data-table>

</template>

<script lang="ts" setup>
     import { onMounted, ref } from 'vue'
     import { usarFeedbackStore } from '@/stores/feedbacks.store'
     import MenuAcoes from '@/components/common/MenuAcoes.vue'
     import { type Cliente } from '@/modules/clientes/clientes.types'
     import { ClientesServices } from '@/modules/clientes/clientes.services'

     const feedback = usarFeedbackStore()

     const clientes = ref<Cliente[]>([])
     const clientesHeaders = [
          { title: 'Nome', value: 'nome' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Telefone', value: 'telefone' },
          { title: 'Ações', value: 'acoes', width: '10%'}
     ]

     async function listarClientes() {
          clientes.value = await ClientesServices.listar()
          feedback.sucesso('Clientes listados com sucesso!')
     }

     onMounted(() => {
          listarClientes()
     })

</script>

<style scoped>
     ::v-deep(.v-input__details) {
          display: none !important
     }
</style>