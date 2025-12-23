<template>
     <v-menu location="center">
          <template #activator="{ props }">
               <v-btn
                    v-bind="props"
                    icon="mdi-dots-vertical"
                    variant="text"
                    density="comfortable"
               />
          </template>

          <v-card style="border-radius: 10px !important;" class="pa-2">
               <v-list-item @click="emit('editar')">
                    <div class="d-flex align-center">
                         <HugeiconsIcon size="20" class="mr-2" :icon="PencilEdit01Icon"/>
                         <p>Editar</p>
                    </div>
               </v-list-item>
               <v-list-item @click="emit('excluir')">
                    <div class="d-flex align-center">
                         <HugeiconsIcon size="20" class="mr-2" :icon="Delete02Icon"/>
                         <p>Excluir</p>
                    </div>
               </v-list-item>
          </v-card>
     </v-menu>
</template>

<script setup lang="ts">
     import { Delete02Icon, PencilEdit01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue'

     const emit = defineEmits<{
          (e: 'editar'): void
          (e: 'excluir'): void
     }>()
</script>
