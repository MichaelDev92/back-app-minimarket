"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require('dotenv').config({ path: '../.env' });
const db_name = process.env.DB_NAME;
const user_name = process.env.DB_USERNAME;
const user_password = process.env.DB_PASSWORD;
const port_db = process.env.DB_USERNAME;
const DB_HOST_URL = process.env.DB_USERNAME;
console.log("database credentials: ", db_name, " ", user_name, " ", user_password, " ", port_db, " ", DB_HOST_URL);
const db = new sequelize_1.Sequelize(db_name, user_name, user_password, {
    host: `${DB_HOST_URL}:${port_db}`,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    // logging: false
});
exports.default = db;
