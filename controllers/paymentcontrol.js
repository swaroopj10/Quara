var express= require("express");
var bodyParser= require("body-parser");

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/payment",{
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

app.post('/payment', function(req,res){
	var fullname = req.body.name;
    var Address=req.body.Address;
    var zip=req.body.zip-code;
	var card_holder_name=req.body.name_card_holder;
    var card_number=req.body.name_card_holder;
	

	var data = {
        "Fullname":fullname,
        "Address":Address,
        "Zip":zip,
        "Card holder name":card_holder_name,
        "card number":card_number,
		
		
	}
db.collection('PaymentDetails').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Appointment Booked Successfully");
        
			
	});
	console.log(data);
		
	return res.redirect('payment/payment.html');
})



app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('payment.html');
}).listen(3000)


console.log("Server listening at port 3000");