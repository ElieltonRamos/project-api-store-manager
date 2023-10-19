const mysql = require('mysql2/promise');

const databaseConfig = {
  host: process.env.MYSQL_HOSTNAME || 'db',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'StoreManager',
};

const connection = mysql.createPool(databaseConfig);

module.exports = connection;
