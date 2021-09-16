/*

NOTE: for now We will not have UI on Angular side for this route. 

*/ 

const { validateStatusTypes, StatusTypes } = require('../models/statusType');
const validateObjectId = require('../middleware/validateObjectId')


const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const statusTypes = await StatusTypes.find() ;
    res.send(statusTypes);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const stausType = await StatusTypes.findById(req.params.id);

    if(!stausType) return res.status(404).send('Status with given ID not found');

    res.send(stausType);
});

router.post('/', async (req, res) => {
    const { error } = validateStatusTypes(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let statustype = new StatusTypes({ statusTypes: req.body.statusTypes });
    statustype = await statustype.save();

    res.send(statustype);
});

router.put('/:id', async (req, res) => {
    const { error } = validateStatusTypes(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const statustype = await StatusTypes.findByIdAndUpdate(req.params.id, {statusTypes: req.body.statusTypes}, { new: true });
    if(!statustype) return res.status(404).send(`Status with given ID not found`);

    res.send(statustype);
});

router.delete('/:id', async (req, res) => {
    const statustype = await StatusTypes.findByIdAndRemove(req.params.id);
    if(!statustype) return res.status(404).send('Status with given ID not found');

    res.send(statustype);
});

module.exports = router ; 