import { Sequelize } from 'sequelize';

const db = new Sequelize('jwt_express', 'root', 'root', {
   host: 'localhost',
   dialect: 'mysql'
})

export default db;