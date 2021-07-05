var myApp = require('express');
var app=myApp();
var mongooseApp = require('mongoose');
var model=require('./models/data_object');
var bodyParser=require('body-parser');
var mybodyParser=bodyParser.json();
var mycrypto=require('crypto');
var key="password";
var algo='aes128';
var jwt=require('jsonwebtoken');
var jwtkey='jwtkey';

mongooseApp.connect('mmongodb+srv://sourav123:Nemesis@cluster0.66rpt.mongodb.net/user?retryWrites=true&w=majority',
    {useNewUrlParser : true,
    useUnifiedTopology : true}
).then(()=>{
    console.log("Database Connected!")
}); 

app.post('/signupenc',mybodyParser,function(req,res){
    var myCipher= mycrypto.createCipher(algo,key);

    var encryptedPassword=myCipher.update(req.body.password,'utf8','hex')
    +myCipher.final('hex');

    const data=new model({
        _id: mongooseApp.Types.ObjectId(),
        email:req.body.email,
        contact:req.body.contact,
        password:encryptedPassword,
    });
    data.save().then((result)=>{
        jwt.sign({result},jwtkey,{expiresIn:'200'},(err,token)=>{

            res.status(201).json({token})
        })
    })
    .catch(err=>console.log(err))
})
app.listen(5000)