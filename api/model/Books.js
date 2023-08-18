const db = require('../config')
const {hash, compare, hashSync} = require('bcrypt')
const {createToken} = require ('../middleware/AuthenticateUser')
class Books{
    fetchBooks(req, res){
        const query = `
        SELECT bookID, bookTitle, category, bookUrl
        From Books;
        `
        db.query(query, 
            (err, results)=>{
                if (err) throw err
                res.json({
                    status: res.statusCode,
                    results
                })
        })
    }
    fetchBook(req, res){
        const query = `
        SELECT bookID, bookTitle, category, bookUrl
        From Books
        Where bookID = ${req.params.id};
        `
        db.query(query,
            (err, result)=>{
                if(err) throw err
                res.json({
                    status: res.statusCode,
                    result
                })
            })
    }
    async registerbook(req, res){
        const data = req.body
        //query
        const query = `
        INSERT INTO Books
        SET ?;
        `
        db.query(query, 
            [data],
            (err)=>{
            if (err) throw err
            res.json({
                status: res.statusCode,
                msg: "You registered a book."
            })
        })
    }
    updateBook(req, res){
        const query = `
        UPDATE Books
        SET ?
        WHERE bookID = ?
        `
        db.query(query, 
            [req.body, req.params.id],
            (err)=>{
                if (err)throw err 
                res.json({
                    status: res.statusCode,
                    msg:"The book record was updated."

                })
            })
    }
    deleteBook(req, res){
        const query = `
        DELETE FROM Books
        WHERE bookID = ${req.params.id};
        `
        db.query(query,
            (err)=>{
            if(err) throw err 
            res.json({
                status: res.statusCode,
                msg:"The book record was removed"
            })
        })
    }
}
module.exports = Books