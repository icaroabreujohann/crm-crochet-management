<template>
     <v-dialog v-model="dialog" width="20vw">
          <v-card>
               <div class="pa-5 d-flex flex-column align-center justify-center">
                    <img width="230px" class="mt-10 no-border"
                         :src="imagemFeedback" />
                    <h1 style="font-size: 2.5rem;" class="text-center mt-10">
                         {{ props.feedback.tipo === 'sucesso' ? 'Sucesso' : 'Erro' }}
                    </h1>
                    <p class="text-center mt-2 subText">{{ props.feedback.mensagem }}</p>
                    <v-btn color="main" variant="tonal" class="mt-7 mb-2" @click="props.feedback.fechar()">Fechar</v-btn>
               </div>
               <v-progress-linear height="5" indeterminate color="main" />
          </v-card>
     </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
     modelValue: boolean,
     feedback: any
}>()

const emit = defineEmits<{
     (e: 'update:modelValue', value: boolean): void
}>()

const dialog = computed({
     get: () => props.modelValue,
     set: (value) => emit('update:modelValue', value)
})

const imagemFeedback = computed(() => {
     const nomeImagem = props.feedback.tipo === 'sucesso' ? 'sucess-dialog.png' : 'error-dialog.png'
     return `http://localhost:3001/images/${nomeImagem}`
})



</script>