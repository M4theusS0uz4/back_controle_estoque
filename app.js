const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const sequelize = require('./config/database');
const fornecedorRoutes = require('./routes/fornecedorRoutes');

const app = express();
app.use(express.json());


app.use('/user',usuarioRoutes);
app.use('/produto',produtoRoutes);
app.use('/fornecedor',fornecedorRoutes)
app.get('/',(req, res) => {
    res.send('Hello Word!');
})

module.exports = app;