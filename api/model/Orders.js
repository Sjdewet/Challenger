const db = require('../config')
const {hash, compare, hashSync} = require('bcrypt')
const {createToken} = require ('../middleware/AuthenticateUser')
class BookAuthors{
    fetchBookAuthors(req, res){
        const query = `
        SELECT a.id,  a.authorName, a.authorSurname, b.bookID
        FROM BookAuthors a
        INNER JOIN Books b
        ON a.bookID = b.bookID;
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
    fetchBookAuthor(req, res){
        const query = `
        SELECT id,  authorName, authorSurname, bookID
        From BookAuthors
        Where id = ${req.params.id};
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
    async registerBookAuthor(req, res){
        const data = req.body
        //query
        const query = `
        INSERT INTO BookAuthors
        SET ?;
        `
        db.query(query, 
            [data],
            (err)=>{
            if (err) throw err
            res.json({
                status: res.statusCode,
                msg: "The author now is registered."
            })
        })
    }
    updateBookAuthor(req, res){
        const query = `
        UPDATE BookAuthors
        SET ?
        WHERE id = ?
        `
        db.query(query, 
            [req.body, req.params.id],
            (err)=>{
                if (err)throw err 
                res.json({
                    status: res.statusCode,
                    msg:"The author record was updated."

                })
            })
    }
    deleteBookAuthor(req, res){
        const query = `
        DELETE FROM BookAuthors
        WHERE id = ${req.params.id};
        `
        db.query(query,
            (err)=>{
            if(err) throw err 
            res.json({
                status: res.statusCode,
                msg:"The author record was removed"
            })
        })
    }
}
module.exports = BookAuthors
//okokok