const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Movimentacao_est = sequelize.define('Movimentacao_est', {
    id_movimentacao:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    },
    id_estoque:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estoque',
            key: 'id_estoque',
        }
    },
    tipo_movimento:{
        type: DataTypes.ENUM,
        values: ['Entrada','Saída'],
        allowNull: false,
    },
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{tableName: 'movimentacao_est'});

module.exports = Movimentacao_est;