const fs = require('fs');

const sinon = require('sinon');

const { expect } = require('chai');
const { imageObject } = require('../../utils/mock');
const FileService = require('../../../src/core/services/Files.service');

describe('uploadFile() - Cobertura', () => {

    const buffer = fs.readFileSync('test/utils/images/tchauu.png');

    it('Testando um upload de arquivo', async () => {

        const img = imageObject(buffer, 'teste.png');

        try {

            const result = await FileService.uploadFile(img);
            expect(result).be.not.empty;

        } catch (err) {

            console.log(err);
        }
    });

    it('Validando uma falha ao executar o upload de arquivo', async () => {

        try {

            await FileService.uploadFile(undefined);

        } catch (err) {

            expect(err).be.not.null;
        }
    });
});

describe('findFile() - Cobertura', () => {

    beforeEach(() => {
        sinon.restore();
        sinon.reset();
    });

    it('Testando a busca de um arquivo', async () => {

        const stub = sinon.stub(FileService, 'findFile');

        stub
            .resolves({ message: 'd+G71fTC6YyXyHmhB5pt0w==' });

        const { message } = await FileService.findFile('tchauu.png');

        expect(message).to.be.a('string');
        expect(message).to.matches(/[A-za-z0-9+/=]/);

    });

    it('Falha ao buscar um arquivo', async () => {
        try {

            const stub = sinon.stub(FileService, 'findFile');

            stub
                .rejects({ message: 'Algo de errado não está certo!' })

            await FileService.findFile('tchau.png');

        } catch (err) {

            console.log(err);

            expect(err).to.be.not.null;
        }
    });
});