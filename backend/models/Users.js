import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;
export const Users = db.define('users', {
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   email: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   gender: {
      type: DataTypes.ENUM,
      values: ['male', 'female', 'other'],
      defaultValue: 'other'
   },
   address: {
      type: DataTypes.STRING,
   },
   avatar: {
      type: DataTypes.STRING,
   },
   role: {
      type: DataTypes.ENUM,
      values: ['0', '1', '2', '3'],
      defaultValue: '2',
      allowNull: false,
   },
   refresh_token: {
      type: DataTypes.TEXT,
   },
   createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
   },
   updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
   }
}, {
   freezeTableName: true,
});