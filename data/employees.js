var mongo = require('mongodb');
var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_connect: true}),
	db = new Db('employee_db', server, {safe: true});

db.open(function(err, db) {
	if (!err) {
		// Connected to 'employee_db' database...
		db.collection('employees', {strict: true}, function(err, collection) {
			if (err) {
				// The 'employees' collection does not exist.
				// Creating it with sample data.
				populateDB();
			}
		});
	}
});

exports.findAll = function(req, res) {
	db.collection('employees', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.findById = function(req, res) {
	var id = req.params.id;
	db.collection('employees', function(err, collection) {
		collection.findOne({
			_id: new BSON.ObjectID(id)
		}, function(err, item) {
			if (err) {
				res.send({"error": "An error has occured."});
			} else {
				res.send(item);
			}
		});
	});
};

exports.addEmployee = function(req, res) {
	var employee = req.body;
	db.collection('employees', function(err, collection) {
		collection.insert(employee, {
			safe: true
		}, function (err, result) {
			if (err) {
				res.send({"error": "An error has occured."});
			} else {
				res.send(result[0]);
			}
		});
	});
};

exports.updateEmployee = function(req, res) {
	var id = req.params.id;
	var employee = req.body;
	delete employee._id;
	db.collection('employees', function (err, collection) {
		collection.update({
			"_id": new BSON.ObjectID(id)
		}, employee, {
			safe: true
		}, function (err, result) {
			if (err) {
				res.send({"error": "An error has occured."});
			} else {
				res.send(employee);
			}
		});
	});
};

exports.deleteEmployee = function (req, res) {
	var id = req.params.id;
	db.collection('employees', function (err, collection) {
		collection.remove({
			"_id": new BSON.ObjectID(id)
		}, {
			safe: true
		}, function (err, result) {
			if (err) {
				res.send({"error": "An error has occured."});
			} else {
				res.send(req.body);
			}
		});
	});
};

var populateDB = function() {

    var employees = [
	    {
	        firstname: "John",
	        lastname: "Doe",
	        designation: "Software Engineer"
	    },
	    {
	        firstname: "Mark",
	        lastname: "Davis",
	        designation: "Sr. Software Engineer"
	    },
	    {
	        firstname: "Kate",
	        lastname: "Stevens",
	        designation: "Designer"
	    },
	    {
	        firstname: "Jack",
	        lastname: "Greene",
	        designation: "Network Administrator"
	    },
	];
	db.collection('employees', function (err, collection) {
		collection.insert(employees, {safe: true}, function (err, result) { });
	});
};