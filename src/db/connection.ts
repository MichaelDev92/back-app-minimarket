import { Sequelize } from "sequelize";

const db = new Sequelize('minimarketDB', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define:{
        timestamps: false
    },
    // logging: false
});

export default db;