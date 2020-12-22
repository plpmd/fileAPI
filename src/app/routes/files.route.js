const express = require('express');
const router = express.Router();
const { uploadFile, findFile, findAllFiles} = require('../controller/Files.controller');
const { upload, afterUpload} = require('../middleware/multerConfig.middleware')
const {auth} = require('../middleware/auth.middleware');

//padrao do banco atendimentos/versao/quem ta pedindo/ id/ o q ela vai fazer

//auth aprendi em: https://openclassrooms.com/en/courses/5614116-go-full-stack-with-node-js-express-and-mongodb/5656301-set-up-authentication-middleware
router.post('/atendimentos/v1/cliente/:id_cliente/upload-arquivo', 
    auth,
    [upload.single('file'), 
    afterUpload], 
    uploadFile);

router.get('/atendimentos/v1/cliente/:id_cliente/:nome_arquivo/buscar-arquivo',
    auth,
    findFile);


router.get('/atendimentos/v1/cliente/:id_cliente/todos-arquivos',
    findAllFiles
    )


module.exports = router;