const { Pool } = require('pg');
require('dotenv').config(); 

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

pool.on('connect', () => {
    console.log('🟢 Conectado ao PostgreSQL!');
});

pool.on('error', (err) => {
    console.error('🔴 Erro no banco de dados:', err);
});

module.exports = pool;
