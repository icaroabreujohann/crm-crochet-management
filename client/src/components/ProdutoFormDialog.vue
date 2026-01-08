<template>
     <v-dialog v-model="dialog" width="50vw">
          <v-card class="pa-10">
               <div class="d-flex align-center justify-space-between mb-5">
                    <div class="d-flex align-center">
                         <HugeiconsIcon class="text-light mr-2" :stroke-width="2" :size="30" color="light"
                              :icon="Tag01Icon" />
                         <h1>{{ modoEditar ? 'Editar Produto' : 'Criar Produto' }}</h1>
                    </div>
                    <div class="d-flex justify-center">
                         <v-btn class="mr-2" variant="tonal" @click="dialog = false">
                              <HugeiconsIcon :size="18" :icon="CancelCircleIcon" class="mr-1" />
                              Cancelar
                         </v-btn>
                         <v-btn class="mr-2" variant="tonal" v-if="props.produto" @click="abrirExcluir(props.produto)">
                              <HugeiconsIcon :size="18"  :icon="Delete02Icon" class="mr-1" />
                              Excluir
                         </v-btn>
                         <v-btn color="main" @click="onSalvar" :disabled="!podeSalvar">
                              <HugeiconsIcon :size="18" :icon="PencilEdit02Icon" class="mr-1" />
                              {{ modoEditar ? 'Salvar' : 'Criar' }}
                         </v-btn>
                    </div>
               </div>
               <v-form ref="vFormRef">
                    <v-tabs color="main" v-model="tabsProduto" align-tabs="center">
                         <v-tab value="tabProduto">
                              <template #prepend>
                                   <HugeiconsIcon :size="20" :icon="Tag01Icon" />
                              </template>
                              Produto
                         </v-tab>
                         <v-tab value="tabMaterial">
                              <template #prepend>
                                   <HugeiconsIcon :size="20" :icon="PackageIcon" />
                              </template>
                              Material
                         </v-tab>
                    </v-tabs>

                    <v-tabs-window v-model="tabsProduto">
                         <v-tabs-window-item value="tabProduto">
                              <v-row>
                                   <v-col cols="7">
                                        <v-row>
                                             <v-col cols="12">
                                                  <p>Nome</p>
                                                  <v-text-field variant="solo-filled" :rules="formRegras.obrigatorio"
                                                       v-model="formProdutoRef.nome" />
                                             </v-col>
                                        </v-row>
                                        <v-row>
                                             <v-col cols="6">
                                                  <p>Preço</p>
                                                  <v-text-field variant="solo-filled" prefix="R$" type="number"
                                                       hide-spin-buttons v-model="formProdutoRef.preco"
                                                       :rules="formRegras.obrigatorio" />
                                             </v-col>
                                             <v-col cols="6">
                                                  <p>Tempo Médio</p>
                                                  <div class="d-flex ga-2">
                                                       <v-text-field class="w-50" variant="solo-filled" suffix="h"
                                                            type="number" min="0" hide-spin-buttons
                                                            v-model="formProdutoRef.tempo_medio.horas" />
                                                       <v-text-field class="w-50" variant="solo-filled" suffix="m"
                                                            type="number" min="0" max="59" hide-spin-buttons
                                                            v-model="formProdutoRef.tempo_medio.minutos"
                                                            :rules="formRegras.minutos_maximos" />
                                                  </div>
                                             </v-col>
                                        </v-row>
                                        <v-row>
                                             <v-col cols="12">
                                                  <p>Fotos</p>
                                                  <v-file-input prepend-icon="" variant="solo-filled" hide-details
                                                       multiple v-model="formProdutoRef.fotos" accept="image/*" chips>
                                                       <template #prepend-inner>
                                                            <HugeiconsIcon class="opacity-50" :icon="Link04Icon" />
                                                       </template>
                                                  </v-file-input>
                                             </v-col>
                                        </v-row>
                                   </v-col>
                                   <v-col cols="5">
                                        <p class="mb-5">Fotos</p>
                                        <v-carousel v-if="formProdutoRef?.fotos.length > 0" hide-delimiters
                                             style="border-radius: 5%;" height="35vh">
                                             <v-carousel-item v-for="foto in formProdutoFotosPreview">
                                                  <v-img :src="foto" cover></v-img>
                                             </v-carousel-item>
                                        </v-carousel>
                                        <v-card class="pa-10 d-flex flex-column justify-center align-center opacity-30"
                                             height="35vh" v-else>
                                             <HugeiconsIcon :size="120" :icon="ImageDelete01Icon" />
                                             <p class="text-center mt-5">Adicione fotos para <br> aparecerem aqui</p>
                                        </v-card>
                                   </v-col>
                              </v-row>
                         </v-tabs-window-item>

                         <v-tabs-window-item value="tabMaterial">
                              <v-table class="mt-5">
                                   <thead>
                                        <tr>
                                             <th>Material</th>
                                             <th>Tipo</th>
                                             <th>Unidade Medida</th>
                                             <th>Quantidade</th>
                                             <th width="5%"><v-btn color="main"
                                                       @click="dialogMaterialSelect = true">Adicionar</v-btn></th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        <tr v-for="m in materiaisSelecionadosExibicao" :key="m.material_codigo">
                                             <td>{{ m.nome }}</td>
                                             <td>{{ m.tipo_nome }}</td>
                                             <td>{{ m.unidade_medida_sigla.toUpperCase() }}</td>
                                             <td width="30%">
                                                  <v-text-field :suffix="m.unidade_medida_sigla" density="compact"
                                                       hide-details hide-spin-buttons type="number" min="0"
                                                       variant="solo-filled" :model-value="m.quantidade"
                                                       @update:model-value="valor =>
                                                            atualizarQuantidade(m.material_codigo, Number(valor))
                                                       " />
                                             </td>
                                             <td width="1%">
                                                  <div class="w-100 d-flex justify-center">
                                                       <HugeiconsIcon @click="removerMaterial(m.material_codigo)"
                                                            :size="20" :icon="Delete02Icon" />
                                                  </div>
                                             </td>
                                        </tr>
                                   </tbody>

                              </v-table>
                         </v-tabs-window-item>
                    </v-tabs-window>
               </v-form>
          </v-card>
     </v-dialog>

     <MaterialSelectDialog v-model="dialogMaterialSelect" :materiaisDoProduto="materiaisSelecionadosCodigos"
          @select="onMaterialSelect" />

     <ConfirmaExclusao v-model="dialogConfirmaExclusao" v-if="produtoSelecionado" :identificador="produtoSelecionado.codigo" :tipo="'produto'" @excluir="onExcluir"/>
</template>

<script lang="ts" setup>

import type { ProdutoForm, ProdutoView } from '@/modules/produtos/produtos.types'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Tag01Icon, Link04Icon, PackageIcon, ImageDelete01Icon, Delete02Icon, CancelCircleIcon, PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { ref, watch, computed } from 'vue'
import type { VForm } from 'vuetify/components'
import { usarMaterialStore } from '@/stores/materiais.store'
import { montarPayloadAlteracoes } from '@/utils/montarPayloadPatch'
import ConfirmaExclusao from './common/ConfirmaExclusao.vue'

const props = defineProps<{
     produto?: ProdutoView | null,
     modelValue: boolean
}>()

const emit = defineEmits<{
     (e: 'update:modelValue', value: boolean): void
     (e: 'salvo', value: ProdutoForm): void
     (e: 'excluir', value: string | number): void
}>()

const dialog = computed({
     get: () => props.modelValue,
     set: (value) => emit('update:modelValue', value)
})

const modoEditar = computed(() => !!props.produto)

const produtoSelecionado = ref<ProdutoView | null >(null)
const formProdutoDefault: ProdutoForm = {
     codigo: '',
     nome: '',
     preco: 0,
     tempo_medio: {
          horas: 0,
          minutos: 0
     },
     fotos: [],
     materiais: []
}
const vFormRef = ref<VForm>()
const formProdutoRef = ref<ProdutoForm>({ ...formProdutoDefault })
const formProdutoRefOriginal = ref<ProdutoForm>({ ...formProdutoDefault })
const formRegras = {
     obrigatorio: [(v: string) => !!v || 'Campo obrigatório'],
     minutos_maximos: [(v: number) => v <= 59 || 'Máximo de 59 minutos.']
}
const formProdutoFotosPreview = computed(() =>
     formProdutoRef.value.fotos?.map((file: File) =>
          URL.createObjectURL(file)
     )
)

const materialStore = usarMaterialStore()

const materiaisSelecionadosCodigos = computed<string[]>(() =>
     formProdutoRef.value.materiais?.map(m => m.material_codigo) ?? []
)

const materiaisSelecionadosExibicao = computed(() => {
     const catalogo = new Map(
          materialStore.materiais.map(m => [m.codigo, m])
     )

     return formProdutoRef.value.materiais.map(m => {
          const material = catalogo.get(m.material_codigo)
          return {
               material_codigo: m.material_codigo,
               quantidade: m.quantidade,
               nome: material?.nome ?? 'Material não encontrado',
               tipo_nome: material?.tipo_nome ?? '-',
               unidade_medida_sigla: material?.unidade_medida_sigla ?? '',
               preco_x_qtd: material?.preco_x_qtd ?? 0
          }
     })
})

function atualizarQuantidade(codigo: string, quantidade: number) {
     const material = formProdutoRef.value.materiais
          .find(m => m.material_codigo === codigo)

     if (material) {
          material.quantidade = quantidade
     }
}

function removerMaterial(codigo: string) {
     formProdutoRef.value.materiais =
          formProdutoRef.value.materiais.filter(
               m => m.material_codigo !== codigo
          )
}

function onMaterialSelect(codigos: string[]) {
     const anteriores = new Map(
          formProdutoRef.value.materiais.map(m => [
               m.material_codigo,
               m.quantidade
          ])
     )

     const catologo = new Map(
          materialStore.materiais.map(m => [
               m.codigo,
               m.quantidade ?? 1
          ])
     )

     formProdutoRef.value.materiais = codigos.map(codigo => ({
          material_codigo: codigo,
          quantidade:
               anteriores.get(codigo) ??
               catologo.get(codigo) ??
               1
     }))
}
const dialogMaterialSelect = ref(false)
const dialogConfirmaExclusao = ref(false)
const tabsProduto = ref<'tabProduto' | 'tabMaterial'>('tabProduto')

const podeSalvar = computed(() => {
     return JSON.stringify(formProdutoRef.value) !== JSON.stringify(formProdutoRefOriginal.value)
})

async function onSalvar() {
     const formValido = await vFormRef.value?.validate()
     const payload = montarPayloadAlteracoes<ProdutoForm>(formProdutoRef.value, formProdutoRefOriginal.value)
     console.log('payload', payload)
     if (!formValido?.valid) return
     emit('salvo', { ...formProdutoRef.value })
}

function onExcluir(identificador: string | number) {
     dialogConfirmaExclusao.value = false
     emit('excluir', identificador)
}

function abrirExcluir(produto: ProdutoView) {
     produtoSelecionado.value = produto
     dialogConfirmaExclusao.value = true
}

watch(
     () => props.produto,
     (produto) => {
          const base: ProdutoForm = produto
               ? {
                    codigo: produto.codigo,
                    nome: produto.nome,
                    preco: produto.preco,
                    tempo_medio: {
                         horas: produto.tempo_medio.horas,
                         minutos: produto.tempo_medio.minutos
                    },
                    fotos: [],
                    materiais: produto.materiais.map(m => ({
                         material_codigo: m.codigo,
                         quantidade: Number(m.quantidade)
                    }))
               } : { ...formProdutoDefault }
          formProdutoRef.value = base
          formProdutoRefOriginal.value = structuredClone(base)
     }
)

watch(dialog, (aberto) => {
     if (!aberto) {
          formProdutoRef.value = { ...formProdutoDefault }
          vFormRef.value?.resetValidation()
     }
})

</script>