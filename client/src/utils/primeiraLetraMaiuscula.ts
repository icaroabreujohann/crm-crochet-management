export const transformaPrimeiraLetraEmMaiuscula = (palavra: string) => {
     return palavra[0]?.toUpperCase()+palavra.substring(1)
}