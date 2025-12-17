<template>
     <v-app>
          <v-navigation-drawer permanent class="pa-4">
               <!-- <v-list-item class="pa-0 ml-1 mt-3 mb-7">
                    <div class="d-flex align-center">
                         <v-icon color="main" style="font-size: 2rem;">mdi-star-four-points-box-outline</v-icon>
                         <div class="ml-2">
                              <h2>Seth Ateliê</h2>
                         </div>
                    </div>
               </v-list-item> -->

               <h5 class="subText f-bold ml-4">MENU</h5>

               <v-list-item
                    v-for="i in menuItems"
                    :to="i.rota"
                    class="mt-1"
               >
                    <div class="d-flex align-center">
                         <v-icon style="font-size: 1.2rem;">{{ i.icone }}</v-icon>
                         <h3 class="f-regular ml-2">{{ i.titulo }}</h3>
                    </div>
               </v-list-item>
          </v-navigation-drawer>
          <v-main>
               <router-view/>
          </v-main>
     </v-app>

     <v-dialog v-model="feedback.aberto" width="20vw">
          <v-card class="">
               <div class="pa-5 d-flex flex-column align-center justify-center">
                    <v-img 
                         width="230px" 
                         class="mt-10"
                         :src="feedback.tipo === 'sucesso' ? '/images/sucess-dialog.png' : '/images/error-dialog.png'"
                    />

                    <h1 style="font-size: 2.5rem;" class="text-center mt-10">{{ feedback.tipo === 'sucesso' ? 'Sucesso' : 'Erro'}}</h1>
                    <p style="font" class="text-center mt-2 subText">{{ feedback.mensagem }}</p>
                    <v-btn color="main" variant="tonal" class="mt-7 mb-2" @click="feedback.fechar()">Fechar</v-btn>
               </div>
               <v-progress-linear height="5" indeterminate color="main"/>
          </v-card>
     </v-dialog>
</template>

<script lang="ts" setup>
     import { ref } from 'vue'
     import { usarFeedbackStore } from './stores/feedbacks.store'

     const feedback = usarFeedbackStore()

     const menuItems = ref([
          {titulo: 'Início', icone: 'mdi-layers-outline', rota: '/'},
          {titulo: 'Clientes', icone: 'mdi-account-multiple-outline', rota: '/clientes'},
          {titulo: 'Materiais', icone: 'mdi-package-variant-closed'},
          {titulo: 'Produtos', icone: 'mdi-tag-outline'},
          {titulo: 'Encomendas', icone: 'mdi-cart-outline'},
     ])

</script>