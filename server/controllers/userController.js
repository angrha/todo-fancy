const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken');
require('dotenv').config()

const salt = bcrypt.genSaltSync(10);

class UserController {
  static findAll(req, res) {
    User.find()
    .populate('todoList')
    .then( users => {
      res.status(200).json({
        message : 'list all user',
        user : users
      })
    })
    .catch( err => res.status(500).send(err))
  }

  static createUser(req, res){
    let objUser = {
      username : req.body.username,
      password : bcrypt.hashSync(req.body.password, salt),
      status   : req.body.status || 'user'
    }

    let user = new User(objUser)

    user.save()
    .then( dataUser => {
      res.status(200).json({
        message : 'new user created!',
        user    : dataUser
      })
    })
    .catch( err => res.status(500).send(err))
  }

  static updateUser(req, res) {
    User.findOne({
      _id : req.params.id,
      username : req.decoded.username
    })
    .then( user => {
      user.username = req.body.username || user.username,
      user.password = req.body.password || user.password,
      user.status   = req.body.status || user.status,

      user.save()
      .then( updatedUser => {
        res.status(200).json({
          message : 'user updated!',
          user    : updatedUser
        })
      })
      .catch( err => res.status(500).send(err))
    })
    .catch( err => res.status(500).send(err))
  }

  static deleteUser(req, res) {
    User.findByIdAndRemove(req.params.id)
    .then( user => {
      res.status(200).json({
        message : 'succesfully deleted',
        user : user
      })
    })
    .catch(err => res.status(500).send(err))
  }

  static register(req, res){
    let objUser = {
      username : req.body.username,
      password : bcrypt.hashSync(req.body.password, salt),
      status   : 'user'
    }

    let user = new User(objUser)

    user.save()
    .then( dataUser => {
      res.status(200).json({
        message : 'sign up success!',
        user    : dataUser.username
      })
    })
    .catch( err => res.status(500).send(err))
  }

  static login(req, res) {
    User.findOne({
      username : req.body.username
    })
    .then( user => {
      if(!user) {
        res.status(403).json({
          message : 'username not found'
        })
      }

      if(!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(403).json({ 
          message : 'wrong username or password'
        })
      }

      let payload = {
        id       : user._id,
        username : user.username,
        status   : user.status
      }
      
      jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
        if(!err) {
          res.status(200).json({
            message : 'authentication valid!',
            userId  : user._id,
            token   : token
          })
        }
      })
    })
    .catch( err => res.status(401).send(err)) 
  }

}

module.exports = UserController