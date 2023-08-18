const express = require('express')
const bodyParser = require('body-parser')
const routes = express.Router()
// Import all model's objects
const {users, books} = require('../model')

// ===== User router =====

// routes.get('^/$|/chanllenger', (req, res)=>{
//     res.sendFile(path.resolve(__direname, "../static/html/index.html"))
// })

routes.get('/users', (req, res)=>{
    users.fetchUsers(req, res)
})
routes.get('/user/:id', (req, res)=>{
    users.fetchUser(req, res)
})
routes.post('/register',
 bodyParser.json(),
 (req, res)=>{
    users.register(req, res)
})
routes.post('/login',
bodyParser.json(),
(req, res)=>{
    users.login(req, res)
})
routes.put('/user/:id', bodyParser.json(),
(req, res)=>{
    users.updateUser(req, res)
})
routes.patch('/user/:id', bodyParser.json(),
(req, res)=>{
    users.updateUser(req, res)
})
routes.delete('/user/:id', (req, res)=>{
    users.deleteUser(req, res)
})

// ===== Book router =====

routes.get('/books', (req, res)=>{
    books.fetchBooks(req, res)
})
routes.get('/book/:id', (req, res)=>{
    books.fetchBook(req, res)
})
routes.post('/registerbook',
bodyParser.json(),
(req, res)=>{
    books.registerbook(req, res)
})
routes.put('/book/:id',bodyParser.json(),
(req, res)=>{
    books.updateBook(req, res)
})
routes.patch('/book/:id',bodyParser.json(),
(req, res)=>{
    books.updateBook(req, res)  
})
routes.delete('/book/:id', (req, res)=>{
    books.deleteBook(req, res)
})
module.exports = {
    express,
    routes
}