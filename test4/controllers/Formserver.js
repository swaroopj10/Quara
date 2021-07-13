var express= require("express");
var bodyParser= require("body-parser");

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Feedback",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
var db=mongoose.connection;
db.on('error', console.log.bind(console, "Connection Error"));
db.once('open', function(callback){
    console.log("Connection Succeeded");
})

var app=express()



app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
	extended: true
}));

app.post('/Feedback', function(req,res){
	var username = req.body.name;
	var email =req.body.email;
	var msg=req.body.msg;
	

	var data = {
		"username":username,
		"email": email,
		"Feedback": msg,
        
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log(data);
        
			
	});
		
	return res.redirect('Form/form.html');
})



app.get('/Feedback',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
}).listen(3000)


console.log("Server listening at port 3000");
