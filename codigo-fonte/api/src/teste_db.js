const pool = require('./config/conection');

async function testConnection() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Conexão bem-sucedida! Data/hora do servidor:', res.rows[0].now);
    } catch (error) {
        console.error('Erro ao conectar:', error);
    } finally {
        pool.end();
    }
}

testConnection();
