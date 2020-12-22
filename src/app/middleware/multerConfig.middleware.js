const multer = require('multer');

const upload = multer({
    fileFilter: (_, file, cb) => {

        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(null, false);
        }
        cb(null, true);
    }
});

function afterUpload(req, res, next) {
    const { file} = req;

    if(!file) return res.status(400).send({message: 'Esse formato de arquivo não é suportado'})

    next();
};



module.exports = { upload, afterUpload};