var express= require("express");
var bodyParser= require("body-parser");
var router = express.Router();
const mongoose = require('mongoose');
const validator = require('validator');
mongoose.set('useCreateIndex', true);

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
//var db = mongoose.connection;


const app=express()



app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
	extended: true
}));

router.post('/Consultation', function(req,res){
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

	const patientdetails = new Patientdetails(data)

	patientdetails.save((err, doc) => {
		if(err){
			console.log(err)
		}

		console.log("doc", doc)
		console.log("Appointment booked successfully")
		
	})
        
	return res.redirect('Consultation/confirmation.html');
			
});
		
module.exports = router;
