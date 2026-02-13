<template>
     <v-card height="100%" class="apptitlebar d-flex w-100 justify-space-between drag">
          <v-row class="mx-1">
               <v-col cols="5" class="justify-start">
                    <v-btn class="no-border no-border-radius h-100 no-drag" size="x-small" @click="voltar">
                         <HugeiconsIcon class="text-main" :size="14" :icon="ArrowLeft01Icon" />
                    </v-btn>
                    <v-btn class="no-border no-border-radius h-100 no-drag" size="x-small" @click="avancar">
                         <HugeiconsIcon class="text-main" :size="14" :icon="ArrowRight01Icon" />
                    </v-btn>
               </v-col>
               <v-col cols="2" class="d-flex align-center no-drag">
                    <v-text-field variant="solo-filled" hide-details readonly v-model="rotaDisplay"
                         class="centered-input extra-compact subText">
                         <template #prepend-inner>
                              <HugeiconsIcon :size="18" :icon="Link01Icon" />
                         </template>
                    </v-text-field>
               </v-col>
               <v-col cols="5" class="d-flex justify-end">
                    <v-btn class="no-border no-border-radius h-100 no-drag" size="x-small" @click="minimizar">
                         <HugeiconsIcon class="text-main" :size="14" :icon="Remove01Icon" />
                    </v-btn>
                    <v-btn class="no-border no-border-radius h-100 no-drag" size="x-small" @click="maximizar">
                         <HugeiconsIcon class="text-main" :size="14" :icon="ChangeScreenModeIcon" />
                    </v-btn>
                    <v-btn class="no-border no-border-radius h-100 no-drag" size="x-small" @click="fechar">
                         <HugeiconsIcon class="text-main" :size="14" :icon="Cancel01Icon" />
                    </v-btn>
               </v-col>
          </v-row>
     </v-card>
</template>

<script setup lang="ts">
import router from '@/router';
import { ArrowLeft01Icon, ArrowRight01Icon, Blockchain01Icon, Cancel01Icon, ChangeScreenModeIcon, Link01Icon, Remove01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const rotaDisplay = computed(() => `seth.ateliê${route.fullPath =='/' ? '' : route.fullPath }`)

const voltar = () => router.back()
const avancar = () => router.forward()

const minimizar = () => {
     window.electronAPI.minimize()
}

const maximizar = () => {
     window.electronAPI.toggleMaximize()
}

const fechar = () => {
     window.electronAPI.close()
}
</script>

<style scoped>
.centered-input :deep(input) {
     text-align: center;
}

.extra-compact :deep(.v-field) {
     min-height: 24px !important;
     padding: 0 8px !important;
}

.extra-compact :deep(input) {
     padding: 2px 0 !important;
     font-size: 14px;
}

.extra-compact :deep(.v-field__input) {
     min-height: 30px !important;
     padding: 2px 0 !important;
}

.drag {
     -webkit-app-region: drag;
}

.no-drag{
     -webkit-app-region: no-drag;
}
</style>