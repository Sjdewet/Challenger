const db = require('../config')
const {hash, compare, hashSync} = require('bcrypt')
const {createToken} = require ('../middleware/AuthenticateUser')

class BookAuthor{
    fetchBookAuthour(req, res){
        const query = `
        SELECT authorName, authorSurname ,bookID
        From BookAuthor;
        `
    } 
}        
module.exports = BookAuthor