const express = require('express');
const router = express.Router();
const { login, signup } = require('../controller/Users.controller');

router.post('/atendimentos/v1/cliente/signup', signup);
router.post('/atendimentos/v1/cliente/login', login);

module.exports = router;