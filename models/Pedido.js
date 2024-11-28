const sequelize = require('../config/database');
const {DataTypes} = require('sequelize');

const Pedido = sequelize.define('Pedido', {
    id_ped:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'id_user',
        }
    },
    valor_tot:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },id_estoque:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'estoque',
            key: 'id_estoque',
            }
        },
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
    {
        tableName: 'pedido',
    })

module.exports = Pedido;