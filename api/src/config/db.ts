import postgres, { Sql } from 'postgres'
import dotenv from 'dotenv'

dotenv.config()

export const sql: Sql = postgres(process.env.DATABASE_URL!, {
     types: {
          date: {
               from: [1082],                  // OID do DATE
               to: 1082,
               parse: (value: string) => value,     // DB -> JS
               serialize: (value: string) => value  // JS -> DB
          }
     }
})

export const testarConexaoDb = async () => {
     try {
          const response = await sql`select now()`
          console.log('Conexão com o DB realizada.', response)
     } catch (error) {
          console.log('Erro ao conectar ao DB.')
     }
}

module.exports = { sql, testarConexaoDb }