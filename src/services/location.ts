import { Pool } from 'pg';

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: Number(DB_PORT)
});

export async function getAll() {
    try {
        // await client.connect();

        const state = await pool.query('SELECT * FROM states');
        const municipality = await pool.query('SELECT * FROM municipalities');
        const parish = await pool.query('SELECT * FROM parishes');

        const data = {state: state.rows, municipality: municipality.rows, parish: parish.rows};

        return {data, error: null};

    } catch (err) {
        console.error('Error connecting or querying database:', err);
        return {data: null, error: 'Error obteniendo los datos de la base de datos'};
    }
}