<template>
     <v-dialog v-model="dialog" width="35vw" persistent>
          <v-card class="pa-10">
               <div class="d-flex align-center mb-5 justify-space-between">
                    <div class="d-flex align-center">
                         <HugeiconsIcon class="text-light mr-2" :stroke-width="2" :size="30"
                              :icon="DashboardCircleIcon" />
                         <h1>{{ modoEditar ? 'Editar Categoria' : 'Criar Categoria' }}</h1>
                    </div>
                    <div class="d-flex">
                         <v-btn class="mr-1" variant="tonal" @click="dialog = false">
                              Cancelar
                         </v-btn>
                         <v-btn color="main" @click="onSalvar">
                              {{ modoEditar ? 'Salvar' : 'Criar' }}
                         </v-btn>
                    </div>
               </div>

               <v-form ref="vFormRef">
                    <v-row>
                         <v-col v-if="modoEditar" cols="2">
                              <p class="mb-1">ID</p>
                              <v-text-field v-model="formCategoriaRef.id" variant="solo-filled" readonly/>
                         </v-col>
                         <v-col :cols="modoEditar ? 10 : 12">
                              <p class="mb-1">Categoria</p>
                              <v-text-field v-model="formCategoriaRef.categoria" variant="solo-filled"
                                   :rules="formRegras.obrigatorio"/>
                         </v-col>
                    </v-row>
               </v-form>
          </v-card>
     </v-dialog>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue';
import type { ProdutoCategoria, ProdutoCategoriaForm } from '@/modules/cadastros/cadastros.types';
import { DashboardCircleIcon } from '@hugeicons/core-free-icons';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
     produto_categoria?: ProdutoCategoria | null,
     modelValue: boolean
}>()

const emit = defineEmits<{
     (e: 'update:modelValue', value: boolean): void
     (e: 'salvo', form: ProdutoCategoriaForm): void
}>()

const dialog = computed({
     get: () => props.modelValue,
     set: (value) => emit('update:modelValue', value)
})

const formCategoriaDefault: ProdutoCategoriaForm = {
     id: undefined,
     categoria: ''
}

const vFormRef = ref()
const formCategoriaRef = ref<ProdutoCategoriaForm>({ ...formCategoriaDefault })

const formRegras = {
     obrigatorio: [(v: string) => !!v || 'Campo obrigatório']
}

const modoEditar = computed(() => !!props.produto_categoria)

async function onSalvar() {
     if (!vFormRef.value) return
     
     const formValido = await vFormRef.value.validate()

     if (!formValido?.valid) return
     
     emit('salvo', { ...formCategoriaRef.value })
     dialog.value = false
}

watch(
     () => props.produto_categoria,
     (categoria) => {
          formCategoriaRef.value = categoria ? {
               id: categoria.id,
               categoria: categoria.categoria
          } : { ...formCategoriaDefault }
     },
     { immediate: true }
)

watch(dialog, (aberto) => {
     if (!aberto) {
          formCategoriaRef.value = { ...formCategoriaDefault }
          vFormRef.value?.resetValidation()
     }
})
</script>