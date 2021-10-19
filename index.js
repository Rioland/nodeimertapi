// package
const http=require("http");
const DATA=require("./ocnfig");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyparser = require("body-parser");
const Joi = require("joi");
const app = express();

// sql
const db = mysql.createPool({
  host: DATA.HOST,
  user: DATA.USER,
  password: DATA.PASSWORD,
  port:DATA.PORT,
  database:DATA.DB,
});
// meddleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});
// get all users
app.get("/api/users", (req, res) => {
  db.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      return;
    }
    let query = "select * from users";
    conn.query(query, (sqlerr, result) => {
      if(sqlerr){
       res.status(404).send(sqlerr);
       return; 
      }
      res.send(result);
    });
  });
});
// get single user
app.get("/api/users/:uid", (req, res) => {
  const q="select * from users where uid=?";
  db.query(q,[req.params.uid],(err,result)=>{
      if(err){
        res.status(400).send(err);
      }
      res.send(result)
  });
  // res.send(req.params);
});

// login

app.post("/api/login", (req, res) => {
  const q = "select * from users where email=? and password=?";
  db.query(q, [req.body.email, req.body.password], (err, result) => {
    if (result) {
      // res.status(400).send(err);
      res.send(result);
     }else{
       res.status(400).send(err);
     }
    
  });

});

// update pin
 app.put("/api/savepin/:uid",(req,res)=>{
  const uid=req.params.uid;
  const pin = req.body.pin;
 
  const q = "UPDATE users SET pin=? WHERE uid=?";
  db.query(q,[pin,uid],(err,result)=>{
    if(err){
      res.send(err.message);
    }else {
      if(result){
       res.send(result.message);
      }
    }
  })

 });
//create user
app.post("/api/register", (req, resp) => {
  const value = req.body;
  if (value) {
   const q = "INSERT INTO `users`(`displayname`, `email`, `token`, `photo`, `conutry`, `time`, `uid`, `phonenumber`, `firstname`, `pin`, `lastname`, `referer`, `biometric`, `password`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
   db.query(q,[],(err,sqlres)=> {
     if(sqlres){
       resp.send(sqlres);
     }
   });


  }

  resp.send(param);
});


app.listen(port, () => {
  console.log(`working on port ${port}`);
});
