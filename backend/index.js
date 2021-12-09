import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { Db } from "mongodb"
import { MongoClient } from "mongodb";

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
var db=mongoose.connection;
mongoose.connect("mongodb://localhost:27017/myLogin", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    pass:String,
    skills:String,
    exp:String,
    dob:String
})
////////////////////////

const companySchema = new mongoose.Schema({
    name: String,
    contact:String,
    pass:String,
    skills:String,
    pos:String
})

const User = new mongoose.model("User", userSchema)
const Company = new mongoose.model("Company", companySchema)


var url = "mongodb://localhost:27017/";


//Routes


app.post("/SignupUser", (req, res)=> {
    const name = req.body.form.name.toString();
        const email = req.body.form.email.toString();
        const pass = req.body.form.pass.toString();
        const skills = req.body.form.skills.toString();
        const exp = req.body.form.exp.toString();
        const dob = req.body.form.dob.toString();
        const user = new User({
            name:name,
            email:email,
            pass:pass,
            skills:skills,
            exp:exp,
            dob:dob})
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("newdb");
                dbo.collection("newuser").findOne({email:email}, function(err, res) {
                    if (res) 
                    {
                     console.log("Already registered")
                     
                    }
                    else{
                        dbo.collection("newuser").insertOne(user, function(err, res){
                            if (err) throw err;
                     else{
                        console.log(user);
                        console.log({message: "record inserted"});
                      }
                    db.close();

                        })

                    }
                })
            })
            //comment by anushka
           
})

    //const { email, password} = req.body
    //User.findOne({ email: email}, (err, user) => {
    
    // user.save(err => {
    //         if(err) {
    //             res.send("Problem")
    //         } else {
    //             res.send(user.name)
    //         }
    //     })
    

    
    




  




app.post("/SignupCompany", (req, res)=> {
    
    
        //const { email, password} = req.body
    //User.findOne({ email: email}, (err, user) => {
    //this.state = {"name":"","contact":"","pass":"","skills":"","pos":""}    
    const name = req.body.form.name.toString();
    const contact = req.body.form.contact.toString();
    const pass = req.body.form.pass.toString();
    const skills = req.body.form.skills.toString();
    const pos = req.body.form.pos.toString();
    const user = new User({
        name:name,
        contact:contact,
        pass:pass,
        skills:skills,
        pos:pos,
        })
   
            MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("newdb");
               
                    dbo.collection("newcompany").findOne({name:name}, function(err, res) {
                        if (res) 
                        {
                         console.log("Already registered")
                        }
                        else{
                            dbo.collection("newcomp").insertOne(user, function(err, res){
                                if (err) throw err;
                         else{
                            console.log(user);
                            console.log({message: "record inserted"});
                          }
                        db.close();
        
                            })
        
                        }
                    })
    })
    // user.save(err => {
    //         if(err) {
    //             res.send("Problem")
    //         } else {
    //             res.send(user.name)
    //         }
    //     })
}) 

app.post("/LoginUser", (req, res)=> {
    const name = req.body.form.name.toString();
        
        const pass = req.body.form.pass.toString();
       
        const user = new User({
            name:name,
            
            pass:pass,
            })
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("newdb");
                dbo.collection("newuser").findOne({name: name, pass:pass}, function(err, res) {
                    if (res) 
                    {
                     console.log("Login successfull")
                    }
                    else{
                        console.log({message: "Incorrect credentials"});
                    }
                })
            })
            
})


app.post("/LoginCompany", (req, res)=> {
    const name = req.body.form.name.toString();
        
        const pass = req.body.form.pass.toString();
       
        const user = new User({
            name:name,
            
            pass:pass,
            })
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("newdb");
                dbo.collection("newcompany").findOne({name: name, pass:pass}, function(err, res) {
                    if (res) 
                    {
                     console.log("Login successfull")
                    }
                    else{
                        console.log({message: "Incorrect credentials"});
                    }
                })
            })
            
})


app.post("/connect", (req, res)=> {
    
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("newdb");
                db.cololection("newcompany").find({}, function(err, res) {
                    if (res) 
                    {
                     console.log(res)
                    }
                    else{
                        //console.log({message: "Incorrect credentials"});
                    }
                })
            })
            
})

app.listen(9000,() => {
    console.log("BE started at port 9000")})
    
    module.exports = {
       Company, User
    }