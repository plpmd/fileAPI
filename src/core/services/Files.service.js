const fs = require('fs');


class FilesService {
    uploadFile(cpf, file) {
        console.log('CPF DO CLIENTE: ', cpf);
        return new Promise((resolve, reject) => {

            const biteArray = new Uint8Array(file.buffer);
            fs.writeFile(`upload/${file.originalname}`, biteArray, (err) => {
                if(!err) {

                    return resolve({message: 'CREATED'});
                }
                reject(err);
            })
        })
    }

    findFile(fileName) {
        return new Promise((resolve, reject) => {
            fs.readFile(`upload/${fileName}`, function(err, data) {
                if(!err) {
                    const convertedData = Buffer.from(data.buffer, 'binary').toString('base64')
                    return resolve({message: 'Found: ' + convertedData});
                }
                reject(err);
            })
        })
    }


    findAllFiles() {
        return new Promise((resolve, reject) => { 
            fs.readdir('upload', function(err, filenames){
                if(!err){
                    return resolve(filenames)
                }
                reject(err);
            });
        })
    }
    


}

module.exports = new FilesService();


/* fs.readdir('upload', function(err, filenames){

    for(var i = 0; i < filenames.length; i ++){

        fs.readFile(`upload/${filenames[i]}`, function(err, data) {

            if(!err) {
                const convertedData = Buffer.from(data.buffer, 'binary').toString('base64')
            }
            reject(err);
        })
    }
    resolve({message: files})


}) */