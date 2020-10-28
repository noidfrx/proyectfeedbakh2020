"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql")); //Importamos mysql
const keys_1 = __importDefault(require("./keys")); //Importamos datos de bd
//Creamos pool con los valores de base de datos keys.ts
const pool = promise_mysql_1.default.createPool(keys_1.default.database);
pool.getConnection()
    .then(connection => {
    pool.releaseConnection(connection);
    console.log('Conexión con base de datos realizada');
});
//Exportamos pool para recibirlo en otra clase
exports.default = pool;
