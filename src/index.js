if (process.env.NODE_ENV === 'dev'){
    const app = require('./server');

    app.init();
}