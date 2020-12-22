const mocks = require('node-mocks-http');

exports.imageObject = (buffer, originalname) => {
    return {
        buffer,
        originalname
    }
}
exports.mockRequest = ({ file = {}, body = {}, params = {} }) => {
    return {
        file,
        body,
        params
    }
}

exports.mockResponse = () => {
    res = mocks.createResponse();
    return res;
}