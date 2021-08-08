const Joi = require('joi');

module.exports = {
    validatePost(item) {
        const schema = Joi.object().keys({
            image: Joi.string(),
            title: Joi.string().min(4).required(),
            content: Joi.string().min(10).required()
        })
        return Joi.validate(item, schema);
    }
}