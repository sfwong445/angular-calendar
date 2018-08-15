const { User } = require('../models');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const jwt = require('jsonwebtoken');
const config = require('../config/config')

function jwtSignUser (user) {
    return jwt.sign(user.toJSON(), config.development.secret)
}

module.exports = {
    async register(req, res) {
        try {
            const user = await User.create({
                Username: req.body.username,
                Password: req.body.password
            })
            console.log(user)
            res.send({
                user: user.toJSON(), 
                token: jwtSignUser(user)
        })} catch (err) {
            res.send({
                error: 'The username already exists'
            })
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                where: {Username: req.body.Username}
            })
            if (user === null) {
                res.status(403).send({
                    error: 'This user does not exist'
                })
            } else {
                const login = await bcrypt.compare(req.body.Password, user.Password)
                if (login) {
                    res.send({
                        user: user.toJSON(),
                        token: jwtSignUser(user)
                    })
                } else {
                    res.status(403).send({
                        error: 'Your password is incorrect'
                    })
                }
            }
        } catch (err) {
            console.log(err)
            res.send({
                error: 'An error occured while logging in'
            })
        }
    },
    async display(req, res) {
        try {
            const users = await User.findAll()
            res.send(users)
        } catch (err) {
            console.log(err)
        }
    }
}