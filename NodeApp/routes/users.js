

const expresss = require('express');
const router = expresss.Router();
const _ = require('lodash');    //used to select only wanted fields
const bcrypt = require('bcrypt');

const { User, userValidation } = require('../models/user') ;


router.post('/', async (req, res) => {
    const { error } = userValidation(req.body);

    // will detect any errors
    if(error){
        let exactError = await error.details[0].message ;

        // will detect and validate email-format-error at server side
        if(exactError == `"email" must be a valid email`){
            console.log(exactError);
            return res.status(422).send('invalidEmail');
            // return res.status(422).statusText().send(error.details[0].message);
        }
        else{
            return res.status(422).send(exactError);
        }   
    } 

    //will detect duplicate email ID
    let user = await User.findOne({ email: req.body.email });
    if (user){
        return res.status(409).send(`User already Exist`);
    } 

    user = new User( _.pick( req.body, ['name','email','password','confirmpassword']) );

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt)
    user.confirmpassword = await bcrypt.hash(user.confirmpassword, salt)

    await user.save();

    res.send( _.pick(user, ['_id', 'name', 'email']) );
});


module.exports = router; 
