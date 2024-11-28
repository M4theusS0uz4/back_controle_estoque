const express = require('express');
const {cadastrarLote,getAllLotes} = require('../controllers/loteController');
const router = express.Router();

router.post('/cadastro', cadastrarLote);
router.get('/lotes', getAllLotes);

module.exports = router;