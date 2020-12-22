const express = require('express');

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json())
    }

    routes() {
        this.app.use(require('./routes/files.route'))
        this.app.use(require('./routes/users.route'))
    }
}

module.exports = () => new App().app;