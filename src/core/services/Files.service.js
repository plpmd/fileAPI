const fs = require('fs');

class FilesService {

    uploadFile(cpf, file) {
        return new Promise((resolve, reject) => {

            const biteArray = new Uint8Array(file.buffer);
            fs.writeFile(`upload/${file.originalname}`, biteArray, (err) => {
                if (!err) {
                    return resolve({ message: 'CREATED' });
                }
                reject(err);
            });
        });
    }

    async findFile(fileName) {
        return new Promise((resolve, reject) => {
            fs.readFile(`upload/${fileName}`, function (err, data) {
                if (!err) {
                    const convertedData = Buffer.from(data.buffer, 'binary').toString('base64')
                    return resolve({ message: 'Found: ' + convertedData });
                }
                reject(err);
            })
        })
    }

    async returnAllFiles() {
        try {

            const totalFiles = await this.findAllFiles();
            let promiseArray = [];

            for (let i = 0; i < totalFiles.length; i++) {
                const promise = this.findFile(totalFiles[i]);
                promiseArray.push(promise);
            }

            const [...allFiles] = await Promise.all(promiseArray);

            return allFiles;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    findAllFiles() {
        return new Promise((resolve, reject) => {
            fs.readdir('upload', function (err, filenames) {
                if (!err) {
                    console.log('FILESNAME::: ', filenames)
                    return resolve(filenames);
                }
                console.log(err)
                reject(err);
            });
        });
    }
}



module.exports = new FilesService();