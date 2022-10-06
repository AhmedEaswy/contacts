import * as dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

let {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    ENV,
} = process.env

if (ENV === 'dev') {
    console.log('dev')
    POSTGRES_DB = process.env.POSTGRES_DB
} else if (ENV === 'test') {
    POSTGRES_DB = process.env.POSTGRES_DB_TEST
}

const client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT ? parseInt(POSTGRES_PORT) : 5432
})


export default client
