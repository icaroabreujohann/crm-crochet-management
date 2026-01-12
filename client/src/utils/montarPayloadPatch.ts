type AnyObject = Record<string, any>

const CHAVES_IMUTAVEIS = new Set(['id', 'codigo'])

function arraysIguais(a: any[] = [], b: any[] = []): boolean {
     if (!Array.isArray(b)) return false
     if (a.length !== b.length) return false

     return a.every((item, i) =>
          JSON.stringify(item) === JSON.stringify(b[i])
     )
}

function isObject(valor: unknown): valor is AnyObject {
     return valor !== null && typeof valor === 'object' && !Array.isArray(valor)
}

export function diferencaObjetos<T extends AnyObject>(
     atual: T,
     original: T
): Partial<T> {
     const resultado: Partial<T> = {}

     for (const chave in atual) {
          if(CHAVES_IMUTAVEIS.has(chave)) continue
          const atualValor = atual[chave]
          const originalValor = original?.[chave]

          if (atualValor === undefined) continue

          if (isObject(atualValor) && isObject(originalValor)) {
               const diff = diferencaObjetos(atualValor, originalValor)
               if (Object.keys(diff).length > 0) {
                    resultado[chave] = diff as any
               }
               continue
          }

          if (Array.isArray(atualValor)) {
               if (!arraysIguais(atualValor, originalValor)) {
                    resultado[chave] = atualValor as any
               }
               continue
          }

          if (atualValor !== originalValor) {
               resultado[chave] = atualValor
          }
     }

     return resultado
}

export function montaPayloadPatch<T extends AnyObject>(
     atual: T,
     original: T
): Partial<T> {
     return {
          codigo: atual.codigo,
          ...diferencaObjetos(atual, original)
     }
}
