const User = require('../models/users');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('../helper/logger');
logger.level = "info"

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });


exports.getAllUsers = (req, res) => {
    User.find({}).then((user)=>{
        res.status(200).json(user)
    }).catch((error)=>{
            console.error(error)
    })
}

exports.createUser = (req,res)=>{
    const newUser = new User(req.body);
    newUser.save()
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json(err));

}

exports.getUserById = ('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err));
});

// Update (PUT)
exports.updateUser = ('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err));
});

// Delete (DELETE)
exports.deleteUser = ('/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => res.status(204).json(user))
    .catch(err => res.status(500).json(err));
});



