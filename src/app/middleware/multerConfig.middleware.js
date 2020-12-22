const multer = require('multer');

const upload = multer({
    fileFilter: (_, file, cb) => {

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(null, false);
        }
        cb(null, true);
    }
});

function afterUpload(req, res, next) {
    const { file } = req;
    console.log('EXECUCAO DO TESTE ::: :::: ')

    if (!file)
        return res.status(400).send({ message: 'Esse formato de arquivo não é suportado' })

    console.log('EXECUCAO DO TESTE ::: :::: 22222');
    next();

};



module.exports = { upload, afterUpload };