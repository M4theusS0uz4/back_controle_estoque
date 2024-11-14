const sequelize = require('../config/database');
const {DataTypes} = require('sequelize');

const Pedido = sequelize.define('Pedido', {
    id_ped:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'id_user',
        }
    },
    data_vend:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['Em andamento', 'Concluido', 'Cancelado'],
    },
    valor_tot:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    }
},
    {
        tableName: 'pedido',
    })

module.exports = Pedido;