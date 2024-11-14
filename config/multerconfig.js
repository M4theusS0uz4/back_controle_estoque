// /config/multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Defina o diretório onde as imagens serão salvas
const uploadDirectory = path.join(__dirname, '..', 'uploads');

// Verifique se a pasta de uploads existe, caso contrário, crie-a
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Configuração de armazenamento para multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory); // Salva na pasta "uploads"
    },
    filename: (req, file, cb) => {
        // Usa o nome original do arquivo
        cb(null, file.originalname); // Mantém o nome original do arquivo
    },
});

// Configuração do multer sem validações
const upload = multer({
    storage,
});

module.exports = upload;
