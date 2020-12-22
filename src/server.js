module.exports.init = () => {
    const port = process.env.PORT || 8080;
    const app = require('./app')();

    app.listen(port, () => {
        console.log(`The server is running on http://localhost:${port}`)
    });
}