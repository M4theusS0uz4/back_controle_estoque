const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');


const Especificacoes_prod = sequelize.define('Especificacoes_prod', {
    id_espec_prod:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    cor:{
        type: DataTypes.STRING,
        allowNull: false,

    }
})