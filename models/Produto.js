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
        foreignKey: 'num_lote',
        allowNull: false
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
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    tableName: 'Produto',
    }
)

module.exports = Produto;