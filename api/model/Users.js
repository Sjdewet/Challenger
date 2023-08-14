const db = require("../api/config")
const{hash, compare, hashSync} = require('bcrypt')
const{createtoken} = require('../middleware/AuthenticateUser')

class Users{
    fetchUsers(req, res){
        const query = `
        SELECT userID, firstName, lastName, gender, userDOB, emailAdd, profileUrl
        FROM Users
        WHERE userID = ${req.params.id};

        `
    }
    async register(req, res){
        const data = req.body
        // Encrypt password
        data.userPass = await hash(data.userPass, 15)    
        //Payload
        const user = {
            emailAdd: data.emailAdd,
            userPass: data.userPass
        }
        //Query
        const query = `
        INSERT INTO USERS
        SET ?;`
        // instead of SET ? you can use - VALUES(?, ?, ?, ?, ?,)
        



        db.query(query, (err)=>{
            if(err)throw err
            //Create token
            let token = createtoken(user)
                res.cookie("LegitUser", token,
                {
                    maxAge: 360000,
                    httpOnly: true
                })
                res.json({
                    status: res.statusCode,
                    msg: "You are now registered."
                })
            
        } )

    }
    updateUser(req, res) {
        
    }
}

db.query(query,
    (err, results)=>{
        if(err) throw err 
        res.json({
            status: res.statusCode, 
            results
        })
    }
    )