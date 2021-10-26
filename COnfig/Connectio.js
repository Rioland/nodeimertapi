const mysql = require("mysql");
const DATA = require("./ocnfig");

const db=mysql.createPool({
  host: DATA.HOST,
  user: DATA.USER,
  password: DATA.PASSWORD,
  port:DATA.PORT,
  database:DATA.DB,
  // localAddress:
  
});

exports.getConnection=()=>db.getConnection((err,conn));