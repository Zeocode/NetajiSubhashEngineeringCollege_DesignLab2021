const mariadb = require('mariadb');
var myApp = require('express');
var app=myApp();
var bodyParser=require('body-parser');
var mybodyParser=bodyParser.json();
var mycrypto=require('crypto');
var key="password";
var algo='aes128';
var jwt=require('jsonwebtoken');
var jwtkey='jwtkey';

const pool = mariadb.createPool({
     host: 'localhost', 
     user:'root', 
     password: '1234',
     database:'user'
});

  


app.post('/signupenc',mybodyParser,async function(req,res){
    var myCipher= mycrypto.createCipher(algo,key);
    var {email,password,contact}=req.body
    var encryptedPassword=myCipher.update(password,'utf8','hex')
    +myCipher.final('hex');

    let conn;
    try {
	    conn = await pool.getConnection();
	    var sql = "INSERT INTO details (email,password,contact) VALUES (?,?,?)";
        const resp = await conn.query(sql, [email, encryptedPassword,contact], function(err, rows, fields) {
        });
	    console.log(resp)
        return res.status(200).send("Successful");
    } catch (err) {
	    throw err;
    } finally {
	    if (conn) return conn.end();

       
    }
   
   
})
app.listen(5000)