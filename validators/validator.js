const Joi = require("joi");
const {joiPasswordExtendCore} = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

const UserSignupSchema = Joi.object({
    email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    firstName: Joi.string()
            .max(255)
            .required(),
    lastName: Joi.string()
            .max(255)
            .trim()
            .required(),
    username: Joi.string()
            .min(5)
            .max(200)
            .required(),
    password: joiPassword.string()
            .minOfSpecialCharacters(2)
            .minOfLowercase(2)
            .minOfUppercase(2)
            .minOfNumeric(2)
            .noWhiteSpaces()
            .required()
            .messages({'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
            'password.minOfSpecialCharacters':
                  '{#label} should contain at least {#min} special character',
            'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
            'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
            'password.noWhiteSpaces': '{#label} should not contain white spaces'}),
    createAt: Joi.date()
            .default(Date.now),
    updateAt: Joi.date()
            .default(Date.now)
})


async function UserSignupValidationMW(req,res,next){
    const userPayload = req.body

    try {
        UserSignupSchema.validateAsync(userPayload)
        next()
    } catch (error) {
        next({
                message: error.details[0].message,
                status: 400
        })
    }
}

module.exports = {UserSignupValidationMW};