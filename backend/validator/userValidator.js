const Joi = require('joi');

module.exports = {
    validateUser(item) {
        const schema = Joi.object().keys({
            fullName: Joi.string().min(2).max(50).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } ).required(),
            username: Joi.string().min(2).max(50).required(),
            password: Joi.string().min(4).max(50).required()
        })
        return Joi.validate(item, schema);
    }
}