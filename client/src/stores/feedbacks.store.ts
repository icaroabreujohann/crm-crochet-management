import { defineStore } from 'pinia'

export const usarFeedbackStore = defineStore('feedback', {
     state: () => ({
          aberto: false,
          mensagem: '',
          tipo: 'sucesso' as 'sucesso' | 'erro'
     }),
     actions: {
          sucesso(mensagem: string) {
               this.aberto = true
               this.mensagem = mensagem
               this.tipo = 'sucesso'

               setTimeout(() => {
                    this.fechar()
               }, 1000)
          },
          erro(mensagem: string) {
               this.aberto = true
               this.mensagem = mensagem
               this.tipo = 'erro'
          },
          fechar() {
               this.aberto = false
          }
     }
})