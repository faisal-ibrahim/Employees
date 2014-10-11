
var express = require('express'),
	employees = require('./data/employees');

var app = express();
app.configure(function() {
	app.use(express.logger('dev'));
	app.use(express.compress());
	app.use(express.bodyParser());
	app.use(express.static(__dirname));
	app.use(require('prerender-node'));
});

app.get('/employees', employees.findAll);
app.get('/employees/:id', employees.findById);
app.post('/employees', employees.addEmployee);
app.put('/employees/:id', employees.updateEmployee);
app.delete('/employees/:id', employees.deleteEmployee);

app.listen(2100);
console.log("Listening at port 2100...");
