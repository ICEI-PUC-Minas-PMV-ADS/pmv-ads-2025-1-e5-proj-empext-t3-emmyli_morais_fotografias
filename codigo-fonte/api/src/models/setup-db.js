const fs = require('fs');
const path = require('path');
const pool = require('./database'); 

const sqlFile = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

pool.query(sqlFile, (err, res) => {
    if (err) {
        console.error('Erro ao criar tabelas:', err);
    } else {
        console.log('Tabelas criadas com sucesso!');
    }
    pool.end();
});
