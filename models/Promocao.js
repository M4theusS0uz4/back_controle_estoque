const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Promocao = sequelize.define(
    'Promocao',
    {
        id_promo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        id_prod: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'produto', // Nome da tabela de referência
                key: 'id_prod', // Chave estrangeira no banco de dados
            },
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2), // Ajuste o tamanho e precisão conforme necessário
            allowNull: false,
        },
        data_fim: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ativo: {
            type: DataTypes.BOOLEAN, // Use BOOLEAN para true/false
            defaultValue: true,
        },
    },
    {
        tableName: 'promocao', // Nome da tabela no banco de dados
        timestamps: true, // Inclui createdAt e updatedAt
    }
);

module.exports = Promocao;