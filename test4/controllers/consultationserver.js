var express= require("express");
var bodyParser= require("body-parser");

const mongoose = require('mongoose');
const validator = require('validator');
mongoose.connect("mongodb://localhost:27017/Consultation",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
var db=mongoose.connection;
db.on('error', console.log.bind(console, "Connection Error"));
db.once('open', function(callback){
    console.log("Connection Succeeded");
})

//SCHEMA
const consultationSchema= new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true,
		unique: true
	},
	phone:{
		type: Number,
		required:true
	},
	doctor:String
});

//collection creation
const Patientdetails =new mongoose.model("Patientdetails",consultationSchema);

const details=new Patientdetails({
	name:"Vedika",
	email:"vedikadalmia74@gmail.com",
	phone:961445045,
});
details.save();

var   app=express()



app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
	extended: true
}));

app.post('/Consultation', function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	var phone=req.body.phone;
	var doctor=req.body.doctor;

	var data = {
		"name":name,
		"email": email,
		"phone": phone,
        "doctor":doctor,
	}
db.collection('Patientdetails').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Appointment Booked Successfully");
        
			
	});
	console.log(data);
		
	return res.redirect('Consultation/confirmation.html');
})



app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
}).listen(3000)


console.log("Server listening at port 3000");
