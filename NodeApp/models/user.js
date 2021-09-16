
const mongoose = require('mongoose');
const Joi = require('joi');
const { join } = require('lodash');


const userScheme = new mongoose.Schema({
    // code: {
    //     type: String,
    //     minlength:1,
    //     maxlength: 50,
    //     trim: true
    // },
    name: {
        type: String,
        minlength:2,
        maxlength: 50,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 900
    },
    confirmpassword: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 900
    }
});

const User = mongoose.model('User', userScheme);

// below function is for validation of this model
// NOTE: below new joi code will be used for new Joi versions
function userValidation(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(50),
        email: Joi.string().required().min(2).max(255).email(),
        password: Joi.string().required().min(4).max(255),
        confirmpassword: Joi.string().required().min(4).max(255)
    })

    return schema.validate(user);
}

module.exports.User = User ;
module.exports.userValidation = userValidation ;