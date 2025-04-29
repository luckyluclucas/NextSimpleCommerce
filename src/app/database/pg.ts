import "server-only"
import pg from 'pg';

export default async function secretInfo() {
const { Client } = pg

  const client = new Client({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
  })
  await client.connect()

  const res = await client.query('SELECT $1::text as message', ['HELLO WORLD!'])
  await client.end()
  console.log(res)
}
