<template>
     <v-card height="100%" class="apptitlebar d-flex w-100 justify-space-between">
          <v-row>
               <v-col cols="5"></v-col>
               <v-col cols="2" class="d-flex align-center">
                    <v-text-field variant="solo-filled" hide-details readonly v-model="rotaDisplay"
                         class="centered-input extra-compact subText"></v-text-field>
               </v-col>
               <v-col cols="5" class="d-flex justify-end">
                    <v-btn class="no-border no-border-radius h-100" size="small" @click="minimizar">
                         <HugeiconsIcon class="text-main" :size="18" :icon="Remove01Icon" />
                    </v-btn>
                    <v-btn class="no-border no-border-radius h-100" size="small" @click="maximizar">
                         <HugeiconsIcon class="text-main" :size="18" :icon="ChangeScreenModeIcon" />
                    </v-btn>
                    <v-btn class="no-border no-border-radius h-100" size="small" @click="fechar">
                         <HugeiconsIcon class="text-main" :size="18" :icon="Cancel01Icon" />
                    </v-btn>
               </v-col>
          </v-row>
     </v-card>
</template>

<script setup lang="ts">
import { Cancel01Icon, ChangeScreenModeIcon, Remove01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

// rotaDisplay agora é computed e atualiza automaticamente
const rotaDisplay = computed(() => `sethateliê${route.fullPath}`)

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

</style>