const middleware = require('../../../src/app/middleware/multerConfig.middleware');
const mock = require('../../utils/mock');
const { expect } = require('chai');

describe('afterUpload() - Cobertura', () => {

    it('Testando afterUpload', () => {

        const obj = {
            file: {},
            body: {},
            params: {}
        }

        const mockFunction = () => { };

        const req = mock.mockRequest(obj);
        const res = mock.mockResponse();

        middleware.afterUpload(req, res, mockFunction);

        expect(res.statusCode).to.be.equals(200);
    });

    it('Testando erro no afterUpload ', () => {

        const mockFunction = () => { };

        const req = {};
        const res = mock.mockResponse();

        middleware.afterUpload(req, res, mockFunction);
        expect(res.statusCode).to.be.equals(400);
    });
});