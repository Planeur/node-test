const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
hbs.registerPartials(__dirname +'/views/partials');
hbs.registerHelper("getCuerrentYear",()=>{
	return new Date().getFullYear()
});
hbs.registerHelper("uppercaseIt",(text)=>{
	return text.toUpperCase()
});
var app = express()
app.set('view engine','hbs');


app.use((req,res,next)=>{
	now = new Date().toString();
	log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile("server.log",log + '\n',(err)=>{
		if (err){
			console.log("unable to log to server log");
		}
	})
	next();
});
//app.use((req,res,next)=>{
	//res.render("maintenance.hbs")
//});
app.use(express.static(__dirname + '/public'));
app.get("/",(req,res)=> {
	res.render('home.hbs',{
		pageTitle: 'Home page',
		welcomeMessage:'Welcome to my website',
		
	})
});
app.get('/about', (req, res)=>{
	res.render('about.hbs',{
		pageTitle: 'About page ingected',
		
	});

});
app.listen(3000, ()=> {
	console.log("server is up and runing on port 3000")
});
	
	/*var app = require('express')() ;
	
	app.get('/', function(req, res){
	  res.send('hello world');
	});
	
	app.listen(3000);*/
	
