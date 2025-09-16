import { Pool } from 'pg';
import {compare} from '@/hooks/hash'

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: Number(DB_PORT)
})

export async function auth(user,pass) {
    try {
        // Busca el usuario en la BD
        const resp = await pool.query('SELECT * FROM users WHERE username = $1', [user]);

        // Si no hay coincidencia termina el proceso, retorna null 
        if (!resp.rows[0]) return null
        
        // Guarda el resultado encontrado en una variable
        const data = resp.rows[0]

        // Comprueba que la contraseña sea correcta
        const veriPass = await compare(pass,data.password)

        // Si la contraseña no es correcta termina el proceso, retorna null
        if (!veriPass) return null

        // Encia los datos del usuario
        return {data, error: null};

    } catch (err) {
        console.error('Error:', err)
        // return null
        return {data: null, error: 'Error obteniendo los datos de la base de datos'};
    }
}