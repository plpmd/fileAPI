const { rejects } = require('assert');
const fs = require('fs');

class UsersService {
    
    writeUser(user) {
        console.log('CPF DO CLIENTE: ', user.cpf);
        return new Promise((resolve, reject) => {

            const userString = `${user.cpf} ${user.email} ${user.password}`;
            fs.writeFile('users/users.txt', userString, (err) => {
                if(!err) {
                    console.log(userString)

                    return resolve({message: 'CREATED'});
                }
                reject(err);
            })
        })
    } 

    findUser(email) {
        return new Promise((resolve, reject)=> {
            fs.readFile(`users/users.txt`, function(err, data) {
                if(!err) {
                    if(data.includes(email)){
                        const convert = Buffer.from(data.buffer, 'binary').toString();
                        return resolve(convert);
                    }
                    else {
                        return reject();
                    }
                }
                else {
                    return reject();
                }
            })
        })
    }
}

module.exports = new UsersService();