const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const loteRoutes = require('./routes/loteRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const path = require("path");
const cors = require('cors');


const app = express();
app.use(express.json());


app.options('*', cors({ origin: "*" }))
app.use(cors());

app.use('/usuario',usuarioRoutes);
app.use('/produto',produtoRoutes);
app.use('/fornecedor',fornecedorRoutes);
app.use('/lote',loteRoutes);
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.get('/',(req, res) => {
    res.send('Hello Word!');
})

module.exports = app;