import { CodigoResposta } from '../../types/codigo.resposta';
import { ResultadoBusca } from '../types';
export declare function assertResultadoExiste<T>(resultado: ResultadoBusca<T>, codigoErro: CodigoResposta, valor?: any): asserts resultado is {
    existe: true;
    data: T;
};
export declare function assertResultadoNaoExiste<T>(resultado: ResultadoBusca<T>, codigoErro: CodigoResposta, valor?: any): asserts resultado is {
    existe: false;
    data: null;
};
//# sourceMappingURL=assertResultadoBusca.d.ts.map