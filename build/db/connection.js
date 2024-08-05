"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require('dotenv').config();
const db_name = process.env.DB_NAME;
const user_name = process.env.DB_USERNAME;
const user_password = process.env.DB_PASSWORD;
const port_db = Number(process.env.DB_PORT);
const host_url = process.env.DB_HOST_URL;
console.log("database credentials: ", db_name, " ", user_name, " ", user_password, " ", port_db, " ", host_url);
const db = new sequelize_1.Sequelize(db_name, user_name, user_password, {
    host: host_url,
    port: port_db,
    dialect: 'mysql',
    define: {
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
exports.default = db;
