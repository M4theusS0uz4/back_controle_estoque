const sequelize = require('../config/database');
const { DataTypes } = require("sequelize");

const Fornecedor = sequelize.define("Fornecedor", {
    id_forn:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nome_forn:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    cnpj:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    tableName: "Fornecedor",
})

module.exports = Fornecedor;