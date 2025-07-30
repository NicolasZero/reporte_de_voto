import { Client } from 'pg';

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env

const client = new Client({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: Number(DB_PORT)
});

export async function getAll() {
    try {
        await client.connect();

        const res = await client.query('SELECT * FROM location_view');

        return {data: res.rows, error: null};

    } catch (err) {
        console.error('Error connecting or querying database:', err);

        return {data: null, error: 'Error obteniendo los datos de la base de datos'};

    } finally {
        await client.end();
    }
}