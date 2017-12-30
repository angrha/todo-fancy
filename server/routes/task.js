const express = require('express');
const router  = express.Router();
const Task    = require('../controllers/taskController')
const isLogin = require('../helper/authentication')
const isAdmin = require('../helper/authorizationAdmin')

router.get('/', isLogin, isAdmin, Task.findAll)
router.get('/:id', isLogin, Task.findUserTask)
router.post('/add', isLogin, Task.addTask)
router.put('/:id', isLogin, Task.updateTask)
router.delete('/:id', isLogin, Task.deleteTask)
router.put('/:id/mark', isLogin, Task.markTask)

module.exports = router