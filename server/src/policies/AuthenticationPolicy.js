const Joi = require('Joi');

module.exports = {
    register(req, res, next) {
        const schema = Joi.object().keys({
            username: Joi.string().alphanum().min(4).max(15).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/)
        })
        const result = Joi.validate({
            username: req.body.username,
            password: req.body.password
        }, schema);

        if (result.error === null) {
            next()
        } else {
            res.send({
                error: 'An error occured validatng the user'
            })
        }
    }
}