const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Especificacoes_prod = sequelize.define('Especificacoes_produto', {
    id_espec_prod:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    cor:{
        type: DataTypes.STRING,
        allowNull: false,

    },
    tamanho:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo:{
        type: DataTypes.ENUM,
        values: ['Tênis', 'Bota', 'Chinelo','Chuteira'],
        allowNull: false,
    },
    genero:{
        type: DataTypes.ENUM,
        values: ['Masculino, Feminino'],
        allowNull: false,
    }
},{tableName: 'especificacoes_produto'});


module.exports = Especificacoes_prod;