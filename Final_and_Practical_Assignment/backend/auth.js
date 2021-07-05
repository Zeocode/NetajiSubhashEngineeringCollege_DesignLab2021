var myApp = require ('express') ; 
var mysql = require ('mysql')
var app=myApp();
var jwt = require("jsonwebtoken");
var jwtkey = "my_secret_key"
var bodyParser=require('body-parser'); 
var mybodyParser=bodyParser.json(); 
var mycrypto=require('crypto'); 
var key="password"; 
var algo='aes128'; 

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'users'
  });


app.post('/auth', mybodyParser, function (req, res) {
    var decryptedPassword;
    var decipher = mycrypto.createDecipher(algo, key);

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        var sql = "SELECT password from details WHERE email = ?";
        connection.query(sql, req.body.email, function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
          var row=JSON.parse(JSON.stringify(results))
          //console.log(row[0].password)
          decryptedPassword = decipher.update(password, 'hex', 'utf8' )+ decipher.final('utf8'); 
          
          //console.log(decryptedPassword)
          //return res.status(200).send("Successful");
          // Handle error after the release.
          if (error) throw error;
       
          // Don't use the connection here, it has been returned to the pool.

        });

        
    });
   
    

    });


app.listen(5000) 
