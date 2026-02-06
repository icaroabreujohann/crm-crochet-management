<template>
     <v-app>
          <v-navigation-drawer permanent class="pa-4">
               <div class="pa-2 d-flex align-center w-100 mb-3">
                    <v-img class="no-border mb-2" :aspect-ratio="1" max-width="50" cover src="/images/logo.png"></v-img>
                    <v-divider vertical class="my-2 mx-2" />
                    <div class="d-flex flex-column ml-2">
                         <h3>Seth Ateliê</h3>
                         <p class="text-black subText" style="font-size: 0.9rem !important;">Crochet Management</p>
                    </div>
               </div>
               <h5 class="subText f-bold ml-2 mb-2">MENU</h5>
               <div class="d-flex flex-column justify-space-between" style="height: 85%;">
                    <div>
                         <v-list-item v-for="i in menuItemsPrincipal" :to="i.rota" class="mt-1">
                              <div class="d-flex align-center">
                                   <HugeiconsIcon :stroke-width="2.2" :size="18" :icon="i.icone">
                                   </HugeiconsIcon>
                                   <h3 class="f-regular ml-2 text-black">{{ i.titulo }}</h3>
                              </div>
                         </v-list-item>
                    </div>
                    <div>
                         <v-list-item v-for="i in menuItemsFooter" :to="i.rota" class="mt-1">
                              <div class="d-flex align-center" @click="dialogConfiguracoes = true">
                                   <HugeiconsIcon :stroke-width="2.2" :size="18" :icon="i.icone">
                                   </HugeiconsIcon>
                                   <h3 class="f-regular ml-2 text-black">{{ i.titulo }}</h3>
                              </div>
                         </v-list-item>
                    </div>
               </div>
          </v-navigation-drawer>

          <v-main>
               <v-container fluid class="pa-10" max-width="80vw">
                    <v-card class="pa-10">
                         <router-view />
                    </v-card>
               </v-container>
          </v-main>
     </v-app>

     <v-dialog v-model="feedback.aberto" width="20vw">
          <v-card class="">
               <div class="pa-5 d-flex flex-column align-center justify-center">
                    <v-img width="230px" class="mt-10"
                         :src="feedback.tipo === 'sucesso' ? '/images/sucess-dialog.png' : '/images/error-dialog.png'" />

                    <h1 style="font-size: 2.5rem;" class="text-center mt-10">{{ feedback.tipo === 'sucesso' ? 'Sucesso'
                         : 'Erro' }}</h1>
                    <p style="font" class="text-center mt-2 subText">{{ feedback.mensagem }}</p>
                    <v-btn color="main" variant="tonal" class="mt-7 mb-2" @click="feedback.fechar()">Fechar</v-btn>
               </div>
               <v-progress-linear height="5" indeterminate color="main" />
          </v-card>
     </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { usarFeedbackStore } from './stores/feedbacks.store'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Layers01Icon, UserMultiple02Icon, PackageIcon, Tag01Icon, ShoppingCart02Icon, Settings02Icon, FolderManagementIcon } from '@hugeicons/core-free-icons'


const feedback = usarFeedbackStore()

const dialogConfiguracoes = ref<boolean>(true)

const menuItemsPrincipal = ref([
     { titulo: 'Início', icone: Layers01Icon, rota: '/' },
     { titulo: 'Clientes', icone: UserMultiple02Icon, rota: '/clientes' },
     { titulo: 'Materiais', icone: PackageIcon, rota: '/materiais' },
     { titulo: 'Produtos', icone: Tag01Icon, rota: '/produtos' },
     { titulo: 'Encomendas', icone: ShoppingCart02Icon, rota: '/encomendas' },

])

const menuItemsFooter = ref([
     { titulo: 'Cadastros Gerais', icone: FolderManagementIcon, rota: '/cadastros_gerais' },

])

</script>