const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require('bcrypt');

const Usuario = sequelize.define("Usuario", {
    id_user:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    primeiro_nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    ultimo_nome:{
        type: DataTypes.STRING,
        allowNull: true,
    }
        }, /*Fechamento das colunas */
    {
    tableName: "usuario",
        hooks:{
            beforeCreate: async (usuario) =>{
                usuario.password =  await criptrografarSenha(usuario.password);
            },
            beforeUpdate: async (usuario) =>{
                if(usuario.changed('password')){
                    usuario.password = await criptrografarSenha(usuario.password);
                }
            }
        }
    }
);
async function criptrografarSenha(senha){
    return await bcrypt.hash(senha, 10);
}
module.exports = Usuario;

