const {User} = require('../models/user');

const config = require('config');   // loading config for setting jwtPrivateKey from config.
const jwt = require('jsonwebtoken');    // loading jsonwebtoken
const _ = require('lodash');  // used to pick only selected item from user
const bcrypt = require('bcrypt');   // used for hashing password
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// router.get('/', async (req, res) => {
//   const genres = await Genre.find().sort('name');
//   res.send(genres);
// });


router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // used to validate the user
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    // validating password by comparing entered password with entered users email password.
    const validatePassword = await bcrypt.compare(req.body.password, user.password);

    // if password not valid
    if (!validatePassword) return res.status(400).send('Invalid email or password.');

    // creating token by .sign() with first arg is payload and secong arg is key.
    const payload = { _id: user._id, name: user.name, email: user.email } ;
    const token = jwt.sign( payload, 'jwtPrivateKey' );

    // sending jwt token in response.
    res.send({token});
    // res.send(`Successfully logged in`);
    // res.send(`Token: ${token}`);

  }catch (error) {
    res.send(error);
  }
});

function validate(req){
    const schema = Joi.object({
      // email: Joi.string().required().min(2).max(255).email(),
      email: Joi.string().required().max(255),
      password: Joi.string().required().max(255),
      // password: Joi.string().required().min(4).max(255),
  })

  return schema.validate(req);
}



module.exports = router;
