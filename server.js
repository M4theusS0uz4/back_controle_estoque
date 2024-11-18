const app = require('./app.js');
const port = 5000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}. Link - http://127.0.0.1:${port}`);
});