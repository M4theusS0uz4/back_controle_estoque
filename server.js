const app = require('./app.js');
const cors = require('cors');


app.use(cors());
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000. Link - http://127.0.0.1:3000')
    }
);