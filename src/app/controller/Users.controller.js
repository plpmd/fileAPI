const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {writeUser, findUser} = require('../../core/services/Users.service');


class UserController {
    async signup(req, res, next) {
        try {
            const {body} = req;
            bcrypt.hash(req.body.password, 10).then(
                (hash) => {
                    const user = 
                    {
                        email: req.body.email,
                        cpf: req.body.cpf,
                        password: hash
                    }
                    
                    writeUser(user)
                        .then(() => {
                            res.status(201).json({message: 'User added sucessfully!'});
                        }).catch((error) => {
                            res.status(500).json({
                                error: error
                            })
                        })
        
                }
            )
        } catch (error) {
            const { message, stack} = error;

            res.status(500).send({ message, stack});
        }
        
    }
    async login(req, res, next){
        await findUser(req.body.email).then((data) => {
            const foundPassword = data.split(' ')[2];
            const userId =  data.split(' ')[0];

            bcrypt.compare(req.body.password, foundPassword).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error('Incorrect password')
                        });
                    }
                    const token = jwt.sign(
                        {userId: userId},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'});
                    res.status(200).json({
                        userId: userId,
                        token: token
                    })
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }).catch(() => {
            res.status(401).json({
                message: 'User not found...'
            })
        })



            
    }
}

module.exports = new UserController();