const express = require('express')
const passport = require('passport')
const router = express.Router()
const axios = require('axios')
const controller = require('../controller/controller')
const student = require('../models/student')
const user = require('../models/user')
const { ensureAuth, ensureGuest} = require('../controller/auth')


// @desc Login
// @route GET /
router.get('/', ensureGuest ,(req, res) => {
    res.render('login', {layout: 'login'})
})

// @desc Dasboard
// @route GET /
router.get('/dashboard', ensureAuth , (req, res) => {
   // console.log(req.user.id)
    //axios.get('http://localhost:3000/api/students')

    student.find({createdBy: req.user.googleId}).lean()
    .then(response => {
        console.log(response)
        res.render('dashboard', {students: response})       
    })
    .catch(err => {
        res.status(500).send({
        message: err.message || "Something went wrong while retrieving the user"
        })
    })
})

// @desc Add User
// @route GET /add-user
router.get('/add-user', ensureAuth, (req, res) => {
    res.render('adduser', { layout: 'addUser'})
})

// @desc Update
// @route GET /
router.get('/update', ensureAuth, (req, res) => {
    axios.get('http://localhost:3000/api/students',{params:{id:req.query.id}})
    .then(function(studentdata){
        res.render('update', {student: studentdata.data})
    })
    .catch(err => {
        res.send(err)
    })
})

//Auth
// @desc Auth with google
// @route GET /auth/google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))



// @desc Google auth callback
// @route GET /auth/google/callback
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/' }), 
(req,res) => {
    res.redirect('/dashboard')
})

// @desc Logout USer
// @route GET /auth/logout
router.get('/auth/logout', (req,res) => {
    req.logout()
    res.redirect('/')
})


//Api
/
router.post('/api/students', controller.create)
router.get('/api/students', controller.find)
router.put('/api/students/:id',controller.update)
router.delete('/api/students/:id', controller.delete)

// @desc 404 not found
// @route GET /
router.get("*", (req, res) => {
    res.status(404).render('404', {layout: 'login'})
})




module.exports = router