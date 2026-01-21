import { EncomendaCriarDB, EncomendaCriarDTO } from "../modules/encomendas/encomendas.types"

export function normalizaTexto(valor?: string | null): string | null {
    if (!valor) return null

    const texto = valor.trim()
    return texto === '' ? null : texto
}

export function normalizaUndefined<T>(v: T | null | undefined): T | null {
    return v ?? null
}

export function normalizaData(valor?: string | Date | null): Date | null {
    if (!valor || valor === '') return null
    return typeof valor === 'string' ? new Date(valor) : valor
}