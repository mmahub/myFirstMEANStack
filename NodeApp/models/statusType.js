const { string } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');


const statusTypeSchema = new mongoose.Schema(
    {
        statusTypes: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 100
        }
    },
    {
        timestamps: true        // this will add createdAt & updatedAt in database
    }
);

const StatusTypes = mongoose.model('StatusTypes', statusTypeSchema);

function validateStatusTypes(statusTypes) {
    const schema = Joi.object({
            statusTypes: Joi.string().required().min(1).max(100)
    })

    return schema.validate(statusTypes);
}

module.exports.StatusTypes = StatusTypes ;
module.exports.statusTypeSchema = statusTypeSchema ;
module.exports.validateStatusTypes = validateStatusTypes ; 