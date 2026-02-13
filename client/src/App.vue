<template>
     <v-app>
          <v-app-bar app fixed height="45" elevation="0" class="barra-titulo-fixa">
               <BarraTitulo />
          </v-app-bar>

          <v-navigation-drawer app permanent class="pa-4">
               <div class="pa-2 d-flex align-center w-100 mb-3">
                    <v-img class="no-border mb-2" :aspect-ratio="1" max-width="50" cover
                         src="/images/logo.png"></v-img>
                    <v-divider vertical class="my-2 mx-2" />
                    <div class="d-flex flex-column ml-2">
                         <h3>Seth Ateliê</h3>
                         <p class="text-black subText" style="font-size: 0.9rem !important;">Crochet Management</p>
                    </div>
               </div>
               <h5 class="subText f-bold ml-2 mb-2">MENU</h5>
               <div>
                    <v-list-item v-for="i in menuItemsPrincipal" :key="i.rota" :to="i.rota" class="mt-1">
                         <div class="d-flex align-center">
                              <HugeiconsIcon :stroke-width="2.2" :size="18" :icon="i.icone" />
                              <h3 class="f-regular ml-2 text-black">{{ i.titulo }}</h3>
                         </div>
                    </v-list-item>
               </div>
               <h5 class="subText f-bold ml-2 mb-2 mt-5">CADASTROS</h5>
               <div>
                    <v-list-item v-for="i in menuItemsCadastros" :key="i.rota" :to="i.rota" class="mt-1">
                         <div class="d-flex align-center">
                              <HugeiconsIcon :stroke-width="2.2" :size="18" :icon="i.icone" />
                              <h3 class="f-regular ml-2 text-black">{{ i.titulo }}</h3>
                         </div>
                    </v-list-item>
               </div>
          </v-navigation-drawer>

          <v-main class="main-content">
               <v-container fluid class="pa-10 content-wrapper">
                    <router-view />
               </v-container>
          </v-main>
     </v-app>

     <DialogMensagem v-model="feedback.aberto" :feedback="feedback"/>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { usarFeedbackStore } from './stores/feedbacks.store'
import { HugeiconsIcon } from '@hugeicons/vue'
import { 
     Layers01Icon, 
     UserMultiple02Icon, 
     PackageIcon, 
     Tag01Icon, 
     ShoppingCart02Icon, 
     DashboardCircleIcon 
} from '@hugeicons/core-free-icons'
import BarraTitulo from './components/BarraTitulo.vue'

const feedback = usarFeedbackStore()

const menuItemsPrincipal = ref([
     { titulo: 'Início', icone: Layers01Icon, rota: '/' },
     { titulo: 'Clientes', icone: UserMultiple02Icon, rota: '/clientes' },
     { titulo: 'Materiais', icone: PackageIcon, rota: '/materiais' },
     { titulo: 'Produtos', icone: Tag01Icon, rota: '/produtos' },
     { titulo: 'Encomendas', icone: ShoppingCart02Icon, rota: '/encomendas' },
])

const menuItemsCadastros = ref([
     { titulo: 'Produto Categorias', icone: DashboardCircleIcon, rota: '/cadastro_produto_categoria' },
])
</script>

<style>
.barra-titulo-fixa {
     background: white;
}

.main-content {
     width: 100%;
     display: flex;
     align-items: center;
     justify-content: center;
}

.content-wrapper {
     width: 100%;
     margin: 0 auto;
}


</style>