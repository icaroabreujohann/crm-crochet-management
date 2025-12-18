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
                         hide-details
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

     <v-dialog v-model="modalCriarCliente" width="30vw">
          <v-card class="pa-7">
               <div class="d-flex align-center mb-5">
                    <v-icon size="x-large" class="mr-2" color="light">mdi-account-plus-outline</v-icon>
                    <h1>Criar Cliente</h1>
               </div>
               <v-form
                    ref="formCriarRef"
                    v-model="formCriarValido"
               >
                    <v-row>
                         <v-col cols="12">
                              <p>Nome</p>
                              <v-text-field
                                   variant="solo-filled"
                                   v-model="formCliente.nome"
                                   :rules="formRegras.obrigatorio"
                              />
                         </v-col>
                    </v-row>
                    <v-row>
                         <v-col cols="6">
                              <p>Instagram</p>
                              <v-text-field
                                   variant="solo-filled"
                                   v-model="formCliente.instagram"
                              />
                         </v-col>
                         <v-col cols="6">
                              <p>Telefone</p>
                              <v-text-field
                                   variant="solo-filled"
                                   v-maska="'(##) #####-####'"
                                   v-model="formCliente.telefone"
                              />
                         </v-col>
                    </v-row>
                    <v-row>
                         <v-col cols="6">
                              <v-btn color="main" width="100%" @click="criarCliente()" :disabled="!formCriarValido" >Criar</v-btn>
                         </v-col>
                         <v-col cols="6">
                              <v-btn variant="tonal" width="100%" @click="limparCampos()">Cancelar</v-btn>
                         </v-col>
                    </v-row>
               </v-form>
          </v-card>
     </v-dialog>

</template>

<script lang="ts" setup>
     import { onMounted, ref } from 'vue'
     import { usarFeedbackStore } from '@/stores/feedbacks.store'
     import MenuAcoes from '@/components/common/MenuAcoes.vue'
     import { type Cliente, type CriarClienteDTO } from '@/modules/clientes/clientes.types'
     import { ClientesServices } from '@/modules/clientes/clientes.services'

     const feedback = usarFeedbackStore()

     const clientes = ref<Cliente[]>([])
     const clientesHeaders = [
          { title: 'Nome', value: 'nome' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Telefone', value: 'telefone' },
          { title: 'Ações', value: 'acoes', width: '10%'}
     ]

     const modalCriarCliente = ref(true)
     const modalEditarCliente = ref(false)

     const formCliente = ref<CriarClienteDTO>({
          id: 0,
          nome: '',
          instagram: '',
          telefone: ''
     })

     const formCriarValido = ref(false)
     const formCriarRef = ref()
     const formRegras = {
          obrigatorio: [(v: string) => !!v || 'Campo obrigatório']
     }

     async function listarClientes() {
          clientes.value = await ClientesServices.listar()
          feedback.sucesso('Clientes listados com sucesso!')
     }

     async function criarCliente() {
          feedback.sucesso('Cliente criado com sucesso!')
          limparCampos()
          listarClientes()
     }

     async function limparCampos() {
          modalCriarCliente.value = false
          modalEditarCliente.value = false
          formCliente.value = {
               id: 0,
               nome: '',
               instagram: '',
               telefone: ''
          }
     }

     onMounted(() => {
          listarClientes()
     })

</script>

<style scoped>

</style>