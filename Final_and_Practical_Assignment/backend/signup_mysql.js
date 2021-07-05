var mysql = require('mysql');
var myApp = require('express');


var app=myApp();
var bodyParser=require('body-parser');
var mybodyParser=bodyParser.json();
var mycrypto=require('crypto');
var key="password";
var algo='aes128';
var jwt=require('jsonwebtoken');
var jwtkey='jwtkey';

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'users'
});
 



app.post('/signupenc',mybodyParser, function(req,res){
    var myCipher= mycrypto.createCipher(algo,key);
    var {name,email,password,contact}=req.body
    var encryptedPassword=myCipher.update(password,'utf8','hex')
    +myCipher.final('hex');


    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        var sql = "INSERT INTO details (name,email,password,contact) VALUES (?,?,?,?)";
        const resp = connection.query(sql, [name,email, encryptedPassword,contact], function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
          //console.log(resp)
          return res.status(200).send("Successful");
          // Handle error after the release.
          if (error) throw error;
       
          // Don't use the connection here, it has been returned to the pool.
        });
      });

   
   
})

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
        //console.log("check"+row)
      
          decryptedPassword = decipher.update(row[0].password, 'hex', 'utf8' )+ decipher.final('utf8'); 
          //console.log(decryptedPassword);
          var mssg = ""
          if(decryptedPassword==req.body.password){
              
              console.log("Password Matched "); 
              mssg="Successful Login";
          
          }
          else{
      
              console.log("Password NOT Matched "); 
              mssg="Password invalid.";
          }
        
  
       
    
        return res.send(mssg);
        //console.log(decryptedPassword)
        //return res.status(200).send("Successful");
        // Handle error after the release.
        if (error) throw error;
     
        // Don't use the connection here, it has been returned to the pool.

      });

      
  });
 
 
      

  });


  app.post('/reqData', mybodyParser, function (req, res) {
  
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        var sql = "SELECT name,contact,password from details WHERE email = ?";
        connection.query(sql, req.body.email, function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
          var row=JSON.parse(JSON.stringify(results));
          //console.log("check"+row[0].name)
          
          
          //return res.status(200).send("Successful");
          res.send(row[0])
          // Handle error after the release.
          if (error) throw error;
       
          // Don't use the connection here, it has been returned to the pool.
  
        });
  
        
    });
   
   
        
  
  });

  app.post('/updateData',mybodyParser, function(req,res){
    var myCipher= mycrypto.createCipher(algo,key);
    var {name,email,password,contact}=req.body
    //console.log(req.body)

    
    
  
  
      pool.getConnection(function(err, connection) {
          if (err) throw err; // not connected!
         
          // Use the connection
          if(password==="")
          {
            var sql = "UPDATE details SET name = ?,  contact = ? WHERE email = ?";
            const resp = connection.query(sql, [name,contact,email], function (error, results, fields) {
          
         
            // When done with the connection, release it.
            connection.release();
            //console.log(results);
            return res.status(200).send("Update Successful");
            // Handle error after the release.
            if (error) throw error;
         
            // Don't use the connection here, it has been returned to the pool.
            });
          }
          else{
            var encryptedPassword=myCipher.update(password,'utf8','hex')
            +myCipher.final('hex');
            var sql = "UPDATE details SET name = ?, password = ?, contact = ? WHERE email = ?";
            const resp = connection.query(sql, [name, encryptedPassword,contact,email], function (error, results, fields) {
          
         
            // When done with the connection, release it.
            connection.release();
            //console.log(results);
            return res.status(200).send("Update Successful");
            // Handle error after the release.
            if (error) throw error;
         
            // Don't use the connection here, it has been returned to the pool.
            });
          }
        });
  
     
     
  })

  app.post('/upload', mybodyParser, function(req, res) {
    const  data = req.body;
    console.log(data)
    // if (data) {
    //     await knex.insert( img: data}).into('img');
    //     res.sendStatus(200);
    // } else {
    //     res.sendStatus(400);
    // }
})

  


// // Add headers
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });


app.listen(5000)