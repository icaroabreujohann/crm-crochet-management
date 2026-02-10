<template>
     <v-img v-if="!erro" :src="src" :width="width" :height="height" cover aspect-ratio="1" class="rounded-lg bg-grey-lighten-3"
          @error="erro = true">
          <template #placeholder>
               <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="main" indeterminate size="36" />
               </div>
          </template>
     </v-img>

     <div v-else :style="{ width, height }" class="d-flex align-center justify-center bg-grey-lighten-3 rounded-lg">
          <HugeiconsIcon :size="70" class="opacity-30" :icon="ImageDelete01Icon" />
     </div>
</template>


<script setup lang="ts">
import { api } from '@/plugins/api'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ImageDelete01Icon } from '@hugeicons/core-free-icons'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
     tipo: string
     codigo: string
     width: string
     height: string
}>()

const erro = ref(false)

const src = computed(
     () => `${api.defaults.baseURL}/arquivos/${props.tipo}/${props.codigo}/1.webp`
)

watch(
     () => [props.tipo, props.codigo],
     () => (erro.value = false)
)
</script>
