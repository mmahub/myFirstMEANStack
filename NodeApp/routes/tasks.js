const { Task, validateTask } = require('../models/task');
const validateObjectId = require('../middleware/validateObjectId')
const verifyToken = require('../middleware/verifyToken')

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//'verifyToken' middleware added to router to validate the token for every request.
router.get('/', verifyToken, async (req, res) => {        

    // const task = await Task.find();
    // res.send(task);


    // source for below code: https://github.com/academind/node-restful-api-tutorial/tree/08-populate-orders-with-products/api/routes
    const task = await Task.find()
        .populate('statusId')   //used for relationalDB: here we are populating values of statusId(reference of statusTypes) field using populate('name_of_field_to_populate', 'selected_properties_to_populate') method of mongoose. 
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                tasks: docs.map(doc => {
                    return {
                        _id: doc._id,
                        task: doc.task,
                        statusId: doc.statusId.statusTypes,     //getting taskTypes_name using ".statusTypes" at end.
                        statusId_id: doc.statusId._id,         //getting taskTypes-_id using "._id" at end.

                        deadline: doc.deadline,
                        deadline_date: doc.deadline.toISOString().slice(0,10),   //extracting only date from 'deadline' property | .slice(0,10)
                        
                        createdAt: doc.createdAt,
                        createdAt_date: doc.createdAt.toISOString().slice(0,10), //extracting only date from 'createdAt' property

                        updatedAt: doc.updatedAt,
                        updatedAt_date: doc.updatedAt.toISOString().slice(0,10), //extracting only date from 'updatedAt' property

                        // request: {
                        //     type: "GET",
                        //     url: "http://localhost:3000/task"
                        // } 
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});


//'verifyToken' middleware added to router to validate the token for every request.
router.get('/:id', [validateObjectId, verifyToken], async (req, res) => {
    const task = await Task.findById(req.params.id)
    .populate('statusId', 'statusTypes')   //used for relationalDB: here we are populating values of statusId(reference of statusTypes) field using populate('name_of_field_to_populate', 'selected_properties_to_populate') method of mongoose. 
    .exec()
    .then(docs => {
        if (!docs) {
            return res.status(404).json({
                message: `Task with given ID not found`
            });
        }
        res.status(200).json({
            tasks: {
                _id: docs._id,
                task: docs.task,
                statusId: docs.statusId.statusTypes,     //getting taskTypes_name using ".statusTypes" at end.
                statusId_id: docs.statusId._id,         //getting taskTypes-_id using "._id" at end.

                deadline: docs.deadline,
                deadline_date: docs.deadline.toISOString().slice(0,10),   //extracting only date from 'deadline' property | .slice(0,10)
                // trim_deadline_date: deadline_date.toISOString().slice(1,11),

                createdAt: docs.createdAt,
                createdAt_date: docs.createdAt.toISOString().slice(0,10), //extracting only date from 'createdAt' property

                updatedAt: docs.updatedAt,
                updatedAt_date: docs.updatedAt.toISOString().slice(0,10), //extracting only date from 'updatedAt' property

                // request: {
                //     type: "GET",
                //     url: "http://localhost:3000/task"
                // } 
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });


    // if (!task) return res.status(404).send(`Task with given ID not found`);
    

});


//'verifyToken' middleware added to router to validate the token for every request.
router.post('/', verifyToken, async (req, res) => {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // let stat = mongoose.Types.ObjectId(req.body.statusId);

    let task = new Task({
        task: req.body.task,
        statusId: req.body.statusId,
        // statusId: stat,
        deadline: req.body.deadline,
        createdOn: req.body.createdOn,
        createdBy: req.body.createdBy,
        editedOn: req.body.editedOn,
        editedBy: req.body.editedBy
    })
    task = await task.save();

    // console.log(`this is 9 id: ${task.statusId}`);

    res.send(task);
});


//'verifyToken' middleware added to router to validate the token for every request.
router.put('/:id', verifyToken, async (req, res) => {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let task = {
        task: req.body.task,
        statusId: req.body.statusId,
        deadline: req.body.deadline,
        createdOn: req.body.createdOn,
        createdBy: req.body.createdBy,
        editedOn: req.body.editedOn,
        editedBy: req.body.editedBy
    };
    task = await Task.findByIdAndUpdate(req.params.id, task, { new: true });
    if (!task) return res.status(404).send(`Task with given ID not found`);

    res.send(task);
});


//'verifyToken' middleware added to router to validate the token for every request.
router.delete('/:id', verifyToken, async (req, res) => {
    task = await Task.findByIdAndRemove(req.params.id);
    if (!task) return res.status(404).send(`Task with given ID not found`);

    res.send(task);
});

module.exports = router;



// const datetime = new Date();

// let modifiedTask = {
//     mtask: task.task,

//     mstatus: task.statusId,

//     //extracting only date from deadline
//     mdeadline: datetime.toISOString(task.deadline).slice(0,10),

//     mcreatedAt: datetime.toISOString(task.createdBy).slice(0,10),

//     mupdatedAt: datetime.toISOString(task.updatedAt).slice(0,10),
// }




// const task = await Task.find()
//         .populate('statusId', 'statusTypes -_id')
//         .exec()
//         .then(docs => {
//             res.status(200).json({
//                 count: docs.length,
//                 orders: docs.map(doc => {
//                     return {
//                         _id: doc._id,
//                         statusId: doc.statusId.statusTypes,
//                         deadline: doc.deadline,
//                         createdAt: doc.createdAt,
//                         updatedAt: doc.updatedAt,
//                         // request: {
//                         //     type: "GET",
//                         //     url: "http://localhost:3000/task"
//                         // }
//                     };
//                 })
//             });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             });
//         });

// });