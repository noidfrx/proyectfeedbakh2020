import mysql from 'promise-mysql'; //Importamos mysql
import keys from './keys'; //Importamos datos de bd

//Creamos pool con los valores de base de datos keys.ts
const pool = mysql.createPool(keys.database);

pool.getConnection()
.then(
    connection => {
        pool.releaseConnection(connection);
        console.log('Conexión con base de datos realizada');
    }
);

//Exportamos pool para recibirlo en otra clase
export default pool;