const express = require('express');

const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/', UserController.getAll)
router.get('/:id', UserController.getById)
router.get('/delete/:id', UserController.deleteById)
router.post('/add', UserController.addUser)
router.post('/update', UserController.update)

module.exports = router