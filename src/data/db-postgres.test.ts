import { data } from "./db-postgres"
import { expect, test } from 'vitest'
import { QueryResult } from "pg"
import { v4 as uuid } from 'uuid';

test('Conectar ao Banco de Dados', async () => {
    const client = await data.dbPool.connect()
    client.release()
})

test('Realizar uma Query', async () => {
    const client = await data.dbPool.connect()

    const result = await client.query('SELECT * FROM books LIMIT 100')

    await client.release()
})

test('Insert no PostgreSQL', async () => {
    const client = await data.dbPool.connect()

    const result = await client.query(`INSERT INTO books (id, name, autor, file)
    VALUES ($1, $2, $3, $4)`,
    [uuid(), 'Nome do LIvro', 'Autor', 'Filepath'])

    await client.release()

})