
import { Sequelize } from "sequelize";
require('dotenv').config();


const db_name = <string> process.env.DB_NAME;
const user_name = <string> process.env.DB_USERNAME;
const user_password = <string> process.env.DB_PASSWORD;
const port_db = Number(process.env.DB_PORT);
const host_url = <string> process.env.DB_HOST_URL;

console.log("db name: ", db_name, " username: ", user_name, " userpassword: ", user_password, " port: ", port_db, " host:", host_url);

const db = new Sequelize(db_name, user_name, user_password, {
    host: host_url,
    port: port_db,
    dialect: 'mysql',
    define:{
        timestamps: false
    },
    // logging: false
});

/** Dev credentials */
// const db = new Sequelize('minimarketdb', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     define:{
//         timestamps: false
//     },
//     // logging: false
// });

export default db;