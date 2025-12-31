import { CodigoResposta } from '../../types/codigo.resposta';
import { ErroCustomizado } from '../../types/erro.customizado';

export function assertPersistencia<T>(
     resultado: T | null | undefined,
     codigoErro: CodigoResposta,
     valor?: unknown
): asserts resultado is T {
     if (!resultado) {
          throw new ErroCustomizado(codigoErro, valor)
     }
}