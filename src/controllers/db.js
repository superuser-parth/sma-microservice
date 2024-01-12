const mysql = require('mysql2/promise');
const dbConfig = {
    host: 'localhost',
  user: 'root',
  password: 'Parthy@2417#',
  database: 'smanalysis',
  connectionLimit: 10, 
  };


  const pool = mysql.createPool(dbConfig);

  module.exports = pool