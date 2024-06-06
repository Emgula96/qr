import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const poolConfig = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_SERVER,
  database: process.env.MSSQL_DATABASE,
  port: parseInt(process.env.MSSQL_PORT, 10),
  options: {
    encrypt: false, // for Azure
    trustServerCertificate: true, // to bypass self-signed certificate error
  },
};

if (process.env.NODE_ENV === 'production') {
  poolConfig.options.encrypt = true; // for Azure SQL Database
}

const poolPromise = new sql.ConnectionPool(poolConfig)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed!', err);
    throw err;
  });

const query = async (text, params) => {
  const pool = await poolPromise;
  const request = pool.request();
  params.forEach(param => {
    request.input(param.name, param.type, param.value);
  });
  return request.query(text);
};

export { poolPromise, sql, query };