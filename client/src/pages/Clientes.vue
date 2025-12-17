<template>
     <v-data-table
          :items="clientes"
          :headers="clientesHeaders"
     ></v-data-table>
</template>

<script lang="ts" setup>
     import { type Cliente } from '@/modules/clientes/clientes.types';
     import { ClientesServices } from '@/modules/clientes/clientes.services';
     import { onMounted, ref } from 'vue'
     import { usarFeedbackStore } from '@/stores/feedbacks.store'
     const feedback = usarFeedbackStore()

     const clientes = ref<Cliente[]>([])
     const clientesHeaders = [
          { title: 'Nome', value: 'nome' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Telefone', value: 'telefone' },
     ]

     async function listarClientes() {
          clientes.value = await ClientesServices.listar()
          feedback.sucesso('Clientes listados com sucesso!')
     }

     onMounted(() => {
          listarClientes()
     })

</script>