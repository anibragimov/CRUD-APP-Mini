const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')

// @desc Login
// @route GET /
router.get('/', (req, res) => {
    res.send('Login')
})

// @desc Dasboard
// @route GET /
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

// @desc Add User
// @route GET /add-user
router.get('/add-user', (req, res) => {
    res.render('adduser', { layout: 'addUser'})
})

// @desc Update
// @route GET /
router.get('/update', (req, res) => {
    res.render('update')
})


//Api
/
router.post('/api/students', controller.create)
router.get('/api/students', controller.find)
router.put('/api/students/:id', controller.update)
router.delete('/api/students/:id', controller.delete)

// @desc 404 not found
// @route GET /
router.get("*", (req, res) => {
    res.status(404).send('Not Here')
})




module.exports = router