var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var database;



/////////////// Connection //////////////////////////

mongo.connect("mongodb://localhost:27017/PYGBD", function(err, db){
	if(!err){
		console.log("we are connected to mongo");
		
		database = db;
	}
});

var server = app.listen(5000, function(){
	console.log('listening on port', server.address().port);
});


app.use(bodyParser.json());

app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

//////////////// Services ////////////////////////////////

//----Create
app.post('/api/message', function(req, res){
	console.log(req.body);
	database.collection('messages').insertOne(req.body);
	res.status(200);
	res.send({ message: '1 Message Successfully created' });
	
});

//----Read
app.get('/api/message', function(req, res){
	var getMessages = database.collection('messages').find().toArray(function(err, results){
		console.log(results);
		res.status(200);
		res.send(results);
	});
});

//----Read by Id
app.get('/api/message/:id', function(req, res){
	var getMessagesbyId = database.collection('messages').find({"_id": new ObjectId(req.params.id)}).toArray(function(err, results){
		console.log(results);
		res.status(200);
		res.send(results);
	});
});

//----Update
app.put('/api/message/:id', function(req, res){
	//var getMessagesbyId = database.collection('messages').find({"_id": new ObjectId(req.params.id)}).toArray(function(err, results){
		//database.collection('messages').update({"_id": new ObjectId(req.params.id)}, {$set:{msg:req.body}});
	var updateMessages = database.collection('messages').update({"_id": new ObjectId(req.params.id)},{$set:{msg:req.body}});
		//console.log(results);
		res.send({ message: 'Messages Successfully updated' });
		res.status(200);		
		//res.send({ message: '1 Message Successfully update' });
	//});
});


//----Delete
app.delete('/api/message', function (req, res) {
	var deleteMessages = database.collection('messages').remove()
		//console.log();
		res.status(200);
		res.send({ message: 'Messages Successfully deleted' });
	
});

//----Delete by Id
app.delete('/api/message/:id', function(req, res){

	var deleteMessagebyId = database.collection('messages').remove({"_id": new ObjectId(req.params.id)})
		//console.log();
		res.status(200);
		res.send({ message: '1 Message Successfully deleted' });
});

