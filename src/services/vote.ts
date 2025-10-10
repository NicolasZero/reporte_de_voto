import { Pool } from 'pg';
import { Vote } from '@/types/vote';

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
        const res = await pool.query('SELECT * FROM votes_view');
        return {data: res.rows, error: null, status: 200};
    } catch (err) {
        console.error('Error connecting or querying database:', err);
        return {data: null, error: 'Error obteniendo los datos de la base de datos', status: 500};
    } 
}

export async function getOne(id: number) {
    try {
        const res = await pool.query('SELECT * FROM votes WHERE id = $1', [id]);
        return {data: res.rows[0], error: null, status: 200};
    } catch (err) {
        console.error('Error connecting or querying database:', err);
        return {data: null, error: 'Error obteniendo los datos de la base de datos', status: 500};
    }
}

export async function create(data: Vote) {
    try {
        const {name, email, gender, state, municipality, parish, phone, ic} = data
        const query = 'INSERT INTO votes (name, email, gender_id, state_id, municipality_id, parish_id, phone, id_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        const value = [name, email, gender, state, municipality, parish, phone, ic];
        const res = await pool.query(query, value);
        return {data: res.rows[0], error: null, status: 200};
    } catch (err) {
        console.error('Error connecting or querying database:', err);
        return {data: null, error: 'Error obteniendo los datos de la base de datos', status: 500};
    }
}