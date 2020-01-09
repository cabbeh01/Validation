const express = require("express");
const app = express();
const {body,check,validationResult} = require("express-validator");

app.use(express.urlencoded({extended:false}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/form.html");
});

app.post("/create",[

    body("message").escape(),
    check("email").not().isEmpty().isEmail(),
    check("age").not().isEmpty().isNumeric()

    

],function(req,res){
    
    if(validationResult(req).errors.length > 0){
        res.redirect("/?error.on="+validationResult(req).errors[0].param);
    }
    else{
        //${JSON.stringify(validationResult(req))}
        res.send(`
        <html>
            <body>
            
            ${req.body.email} <hr>
            ${req.body.age} <hr>
            ${req.body.message} <hr>
            </body>
        </html>
    
    `)
    }
});


app.listen(4321,function(){
    console.log("http://localhost:4321");
})