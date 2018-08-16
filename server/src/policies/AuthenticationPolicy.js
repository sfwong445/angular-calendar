const Joi = require('joi');

module.exports = {
    register(req, res, next) {
        const schema = Joi.object().keys({
            Username: Joi.string().alphanum().min(4).max(15).required(),
            Password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/)
        })
        const result = Joi.validate({
            Username: req.body.Username,
            Password: req.body.Password
        }, schema);

        if (result.error === null) {
            next()
        } else {
            console.log(result.error)
            res.send({
                error: 'An error occured validatng the user'
            })
        }
    }
}