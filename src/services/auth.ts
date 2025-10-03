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
        const userFound = await pool.query('SELECT * FROM users WHERE username = $1', [user]);

        // Si no hay coincidencia termina el proceso, retorna null 
        if (!userFound.rows[0]) throw Error("Usuario o contraseña incorrecto")
        
        // Guarda el resultado encontrado en una variable
        const data = userFound.rows[0]

        // Comprueba que la contraseña sea correcta
        const veriPass = await compare(pass,data.password)

        // Si la contraseña no es correcta termina el proceso, retorna null
        if (!veriPass) throw Error("Usuario o contraseña incorrecto")
        // Encia los datos del usuario
        return {data};

    } catch (err) {
        console.error('Error:', err)
        // return null
        throw Error("Usuario o contraseña incorrecto") ;
    }
}