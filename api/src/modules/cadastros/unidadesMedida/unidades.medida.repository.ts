import { sql } from '../../../config/db'
import { UnidadeMedida } from './unidades.medida.types';

export class UnidadesMedidaRepository {
     async listar(): Promise<UnidadeMedida[]> {
          return await sql<UnidadeMedida[]>`
               select * from unidades_medida
          `
     }
}