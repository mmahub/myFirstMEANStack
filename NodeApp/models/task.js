const { string, date } = require('joi');
const { statusTypeSchema, StatusTypes } = require('./statusType')

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); // package required for validating ID's
const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const { join } = require('lodash');


const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000
    },
    statusId: {
        type: Schema.Types.ObjectId,                     
        ref: 'StatusTypes',    //StatusTypes
        required: true
     },
    deadline: {
        type: Date
    },
    createdBy: {
        type: String,
        minlength: 1,
        maxlength: 100
    },
    editedBy: {
        type: String,
        minlength: 1,
        maxlength: 100
    }
},
{
    timestamps: true        // this will add createdAt & updatedAt in database
}
);

const Task = mongoose.model('Task', taskSchema);

function validateTask(task) {
    const schema = Joi.object({
        task: Joi.string().required().min(1).max(1000),
        statusId: Joi.objectId().required(),
        deadline: Joi.date(),
        createdOn: Joi.date(),
        createdBy: Joi.string(),
        editedOn: Joi.date(),
        createdBy: Joi.string()
    })

    return schema.validate(task);
}

module.exports.Task = Task;
module.exports.validateTask = validateTask;



// {
//     timestamps: { 
//         createdAt: 'createdDateTime', 
//         updatedAt: 'updatedDateTime' 
//     }
// }

// createdOn: {
//     type: Date,
//     default: Date.now
// },

// editedOn: {
//     type: Date
// },    