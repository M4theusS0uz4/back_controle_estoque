const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Lote = sequelize.define('Lote', {
    num_lote:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    id_forn:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Fornecedor',
            key: 'id_forn',
        }
    },
    data_entrada:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    quant_recebida:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo_recebido: {
        type: DataTypes.ENUM,
        values: ['Tênis', 'Bota', 'Chinelo', 'Chuteira'],
        allowNull: false,
    }
},
    {
        tableName: 'Lote',
    })

module.exports = Lote;