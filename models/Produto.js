const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    id_prod:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    num_lote:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'Lote',
            key: 'num_lote',
        }
    },
    nome_prod:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    marca_prod:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco_unit:{
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    url_img:{
        type: DataTypes.STRING,
        allowNull: true,
    },
},{
    tableName: 'Produto',
    }
)

module.exports = Produto;