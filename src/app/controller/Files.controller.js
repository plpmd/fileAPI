const FileService = require('../../core/services/Files.service')

class FilesController {

    async uploadFile(req, res) {
        try {
            const { file } = req;

            const message = await FileService.uploadFile(file);
                        
            res.status(201).send({ message: 'Seu arquivo foi salvo com sucesso!' });
        } catch (error) {

            const { message, stack } = error;

            res.status(500).send({ message, stack });
        }
    }

    async findFile(req, res) {
        try {
            const { params } = req;

            const result = await FileService.findFile(params.nome_arquivo);
            res.status(201).send({ message: 'Arquivo encontrado!', result: result });

        } catch (error) {
            const { message, stack } = error;

            res.status(500).send({ message, stack });
        }
    }

    async findAllFiles(req, res) {
        try {

            const allFiles = await FileService.returnAllFiles();
            res.status(201).send({ message: 'Arquivos encontrados!', result: allFiles });

        } catch (error) {

            const { message, stack } = error;
            res.status(500).send({ message, stack });
        }
    }
}

module.exports = new FilesController(); 