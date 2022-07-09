const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHarsh');

    if(!userList) {
        res.status(500).json({success: false});
    }
    res.send(userList);
})

router.get('/:id',async(req, res) =>{
    const user = await User.findById(req.params.id).select('-passwordHarsh');

    if (!user) {
        res.status(500).json({message: 'The user with this ID was not found!'})
    }
    res.status(200).send(user);
})
  router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        appartment: req.body.appartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    },
    {new: true}

    ) 


    if(!user)
    return res.status(400).send('The user cannot be created!')

    res.send(user);
})

router.post('/login', async (req, res) => {
    const user = await user.findOne({email: req.body.email})

    if(!user) {
        return res.status(400).send('The user is not found');
    }

    if(user && bycript.compareSync(req.body.passwordHash)){
        res.status(200).send('User Authentication')
    }else {
        return res.status(400).send('pasword is wrong');
    }


})


module.exports = router;