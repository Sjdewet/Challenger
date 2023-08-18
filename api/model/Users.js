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
    login(req, res) {
        const {emailAdd, userPass} = req.body
        // query
        const query = `
        SELECT firstName, lastName,
        gender, userDOB, emailAdd, userPass,
        profileUrl
        FROM Users
        WHERE emailAdd = ?;
        `
        db.query(query, [emailAdd], async (err, result)=>{
            if(err) throw err
            if(!result?.length){
                res.json({
                    status: res.statusCode,
                    msg: "You provided a wrong email."
                })
            }else {
                await compare(userPass,
                    result[0].userPass,
                    (cErr, cResult)=>{
                        if(cErr) throw cErr
                        // Create a token
                        const token =
                        createToken({
                            emailAdd,
                            userPass
                        })
                        // Save a token


                        res.cookie("LegitUser",
                        token, {
                            maxAge: 3600000,
                            httpOnly: true
                        })
                        if(cResult) {
                            res.json({
                                msg: "Logged in",
                                token,
                                result: result[0]
                            })
                        }else {
                            res.json({
                                status: res.statusCode,
                                msg:
                                "Invalid password or you have not registered"
                            })
                        }
                    })
            }
        })
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