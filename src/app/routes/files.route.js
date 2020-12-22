const express = require('express');
const router = express.Router();
const { uploadFile, findFile} = require('../controller/Files.controller');
const { upload, afterUpload} = require('../middleware/multerConfig.middleware')
const {auth} = require('../middleware/auth.middleware');

//padrao do banco atendimentos/versao/quem ta pedindo/ id/ o q ela vai fazer
router.post('/atendimentos/v1/cliente/:id_cliente/upload-arquivo', 
    [upload.single('file'), 
    afterUpload], 
    uploadFile);

router.get('/atendimentos/v1/cliente/:id_cliente/:nome_arquivo/buscar-arquivo',
    findFile);

//token de autenticacao no middleware

//retornar todos os arquivos da pasta upload 


module.exports = router;