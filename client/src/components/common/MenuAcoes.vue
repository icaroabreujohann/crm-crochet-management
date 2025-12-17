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
                         <v-icon size="small" class="mr-2">mdi-pencil-outline</v-icon>
                         <p>Editar</p>
                    </div>
               </v-list-item>
               <v-list-item @click="emit('excluir')">
                    <div class="d-flex align-center">
                         <v-icon size="small" class="mr-2">mdi-delete-outline</v-icon>
                         <p>Editar</p>
                    </div>
               </v-list-item>
          </v-card>
     </v-menu>
</template>

<script setup lang="ts">
     const emit = defineEmits<{
          (e: 'editar'): void
          (e: 'excluir'): void
     }>()
</script>
