const Users = require('./Users')
const Orders = require('./Orders')
const Books = require('./Books')
const BookAuthor = require('./BookAuthor')
// Export all objects
module.exports = {
    users: new Users()
}