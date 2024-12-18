import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pc_specs'
}).promise()


async function getEntries() {
    const [result] = await pool.query("SELECT * FROM main");
    return result
}


export {getEntries}

