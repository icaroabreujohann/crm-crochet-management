import { sql } from '../../../config/db'
import { TipoMaterial } from './tipos.materiais.types';

export class TiposMateriaisRepository {
     async listar(): Promise<TipoMaterial[]> {
          return await sql<TipoMaterial[]>`
               select * from materiais_tipos
          `
     }
}