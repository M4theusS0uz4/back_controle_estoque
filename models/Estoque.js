const sequelize = require('../config/database');
const {DataTypes} = require('sequelize');

const Estoque = sequelize.define('estoque', {
    id_estoque:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true,
    },
    id_espec_prod:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'especificacoes_prod',
            key:'id_espec_prod',
        }
    },
    id_prod:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produto',
            key: 'id_prod',
        }
    },
    quant_atual:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quant_max:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quant_min:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    url_img:{
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    tableName: 'estoque',
})

module.exports = Estoque;