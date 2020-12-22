const {uploadFile, findFile, findAllFiles} = require('../../core/services/Files.service')

class FilesController {

    async uploadFile(req, res) {
        try {
            const {params, file, body} = req;

            console.log("TESTE DO BODY:::", body);
            const result = await uploadFile(params.id_cliente, file);

            console.log(result);

            res.status(201).send({ message: 'Seu arquivo foi salvo com sucesso!'});
        } catch (error) {
            
            const { message, stack} = error;

            res.status(500).send({ message, stack});
        }
    }

    async findFile(req, res){
        try {
            const {params} = req;

            const result = await findFile(params.nome_arquivo);
            res.status(201).send({message: 'Arquivo encontrado!', result: result })
        } catch (error) {
            const { message, stack} = error;

            res.status(500).send({ message, stack});
        }
    }

    async findAllFiles(req, res) {
        try {
            const totalFiles = await findAllFiles();
            const files = new Array();
            for(var i = 0; i < totalFiles.length ; i ++ ){
                const file = await findFile(totalFiles[i])
                files.push(file)
            }


            res.status(201).send({message: 'Arquivos encontrados!', result: files })
        } catch (error) {
            const { message, stack} = error;

            res.status(500).send({ message, stack});
        }
        
       
    }
}

module.exports = new FilesController(); 