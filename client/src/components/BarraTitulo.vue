<template>
     <v-card height="100%" class="apptitlebar d-flex w-100 justify-end">
          <v-btn class="no-border no-border-radius h-100" size="small" @click="minimizar">
               <HugeiconsIcon class="text-main" :size="18" :icon="Remove01Icon" />
          </v-btn>

          <v-btn class="no-border no-border-radius h-100" size="small" @click="maximizar">
               <HugeiconsIcon class="text-main" :size="18" :icon="ChangeScreenModeIcon" />
          </v-btn>

          <v-btn class="no-border no-border-radius h-100" size="small" @click="fechar">
               <HugeiconsIcon class="text-main" :size="18" :icon="Cancel01Icon" />
          </v-btn>
     </v-card>
</template>

<script setup lang="ts">
import { Cancel01Icon, ChangeScreenModeIcon, Remove01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';


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

<style></style>