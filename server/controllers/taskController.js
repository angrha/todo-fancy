const Task = require('../models/taskModel')

class TaskController {
  
  static findAll(req, res) {
    Task.find()
    .then( tasks => {
      res.status(200).json({
        message : 'list of all Task',
        task : tasks
      })
    })
    .catch( err => res.status(500).send(err))
  }

  static findUserTask(req, res) {
    Task.findOne({
      _id : req.params.id,
      author : req.decoded.id
    })
    .populate('author', 'username')
    .then( userTask => {
      res.status(200).json({
        message : 'your task',
        task : userTask
      })
    })
    .catch( err => res.status(500).send(err))
  }

  static addTask(req, res) {
    let task = new Task({
      author : req.decoded.id,
      title  : req.body.title || `${req.body.task.substr(0,10)}...`,
      task   : req.body.task
    })

    task.save()
    .then( task => {
      res.status(200).json({
        message : 'success create new task',
        task : task
      })
    })
    .catch( err => res.status(500).send(err))
  }

  static updateTask(req, res) {
    Task.findOne({
      _id : req.params.id,
      author : req.decoded.id
    })
    .then( task => {
      task.title = req.body.title || task.title,
      task.task = req.body.task || task.task,

      task.save()
      .then( updatedTask => {
        res.status(200).json({
          message : 'task updated!',
          task    : updatedTask
        })
      })
      .catch( err => res.status(500).send(err))
    })
    .catch( err => res.status(500).send(err))
  }

  static deleteTask(req, res) {
    Task.remove({
      _id : req.params.id,
      author: req.decoded.id
    })
    .then(() => {
      res.status(200).json({
        message : 'succes deleted',
      })
    })
    .catch(err => res.status(500).send(err))
  }

  static markTask(req, res) {
    Task.findOne({
      _id : req.params.id,
      author : req.decoded.id
    })
    .then( task => {
      task.completion = req.body.completion || task.completion,

      task.save()
      .then( mark => {
        res.status(200).json({
          message : 'Succes mark',
          completion    : mark
        })
      })
      .catch( err => res.status(500).send(err))
    })
    .catch( err => res.status(500).send(err))
  }

}

module.exports = TaskController