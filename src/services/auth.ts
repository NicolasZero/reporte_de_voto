import { Pool } from 'pg';

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: Number(DB_PORT)
});

export async function auth() {
    try {
        const resp = await pool.query('SELECT username FROM users WHERE username = $1', ['admin']);

        
        const data = {response: resp.rows[0]};

        return {data, error: null};

    } catch (err) {
        console.error('Error connecting or querying database:', err);
        return {data: null, error: 'Error obteniendo los datos de la base de datos'};
    }
}