<template>
     <v-dialog v-model="dialog"></v-dialog>
</template>

<script setup lang="ts">
import type { ProdutoCategoria } from '@/modules/cadastros/cadastros.types';
import { computed } from 'vue';


const props = defineProps<{
     produto_categoria?: ProdutoCategoria | null,
     modelValue: boolean
}>()

const emit = defineEmits<{
     (e: 'update:modelValue', value: boolean): void
     (e: 'salvo', form: ProdutoCategoria): void
}>()

const dialog = computed({
     get: () => props.modelValue,
     set: (value) => emit('update:modelValue', value)
})

</script>