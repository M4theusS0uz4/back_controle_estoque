const sequelize = require('../config/database');
const {DataTypes} = require('sequelize');

const Itens_carrinho = sequelize.define('Itens_carrinho', {
    id_itms_cart:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    id_estoque:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estoque',
            key: 'id_estoque',
        }
    },
    id_ped:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pedido',
            key: 'id_ped',
        }
    },
    quantidade_cart:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    tableName: 'itens_carrinho',
})

module.exports = Itens_carrinho;