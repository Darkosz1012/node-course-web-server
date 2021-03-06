const express = require('express')
const hbs = require("hbs")
const fs = require("fs")

var app = express();

hbs.registerPartials(__dirname+"/views/partials")
app.set('view engine', 'hbs')


app.use(function(req,res,next){
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile("server.log",log+"\n",function(err){
        if(err){
            console.log("Unable to append to server.log")
        }
    })
    next()
})

// app.use(function(req,res,next){
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname+"/public"))

hbs.registerHelper("getCurrentYear",function(){
    return new Date().getFullYear()
})

hbs.registerHelper("screamIt",function(text){
    return text.toUpperCase()
})

app.get("/", function(req,res){
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        message: "Welcome asfasfd"
    })
})

app.get("/about", function(req,res){
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})


app.listen(3000, function(){
    console.log("server is up on port 3000 ")
});