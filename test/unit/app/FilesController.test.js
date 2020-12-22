const FilesController = require('../../../src/app/controller/Files.controller');
const FileService = require('../../../src/core/services/Files.service');

const { mockResponse, mockRequest } = require('../../utils/mock');
const sinon = require('sinon');
const { expect } = require('chai');

describe('FilesController - cobertura', () => {

    beforeEach(() => {
        sinon.restore();
        sinon.reset();
    });

    it('Testando controller de upload', async () => {

        const serviceStub = sinon.stub(FileService, 'uploadFile');

        const obj = {
            file: {},
            body: {},
            params: {}
        }

        const req = mockRequest(obj);
        const res = mockResponse();

        serviceStub
            .resolves({ message: 'Seu arquivo foi enviado com sucesso!' });


        await FilesController.uploadFile(req, res);

        console.log(res.statusCode);

        expect(res.statusCode).to.be.equals(201);
    });

    it('Testando a falha do controller de upload', async () => {

        const serviceStub = sinon.stub(FileService, 'uploadFile');

        const obj = {
            file: {},
            body: {},
            params: {}
        }

        const req = mockRequest(obj);
        const res = mockResponse();

        serviceStub
            .rejects({ message: 'FALHA AO RECEBER O ARQUIVO!' });

        await FilesController.uploadFile(req, res);

        console.log(res.statusCode);

        expect(res.statusCode).to.be.equals(500);
    });

});