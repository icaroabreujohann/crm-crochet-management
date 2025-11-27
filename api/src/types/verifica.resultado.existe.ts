export type verificaResultadoExiste<T> = {
     existe: boolean,
     data: T | null,
     campo: string
}