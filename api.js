var express = require('express');
// var session = require('express-session');
// var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var mongoose = require('mongoose');

var example_class = require('./routers/example_class');
var avaliacao = require('./routers/avaliacao');

var app = express();

var server_port = process.env.PORT || 5000;
app.set('port', server_port);

var connection_string = process.env.DATABASE || 'mongodb://localhost/mongooseTests';

mongoose.Promise = global.Promise;
mongoose.connect(connection_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we\'re connected!');
});

// app.use(cookieParser())
// app.use(session({
// 	secret: 'keyboard cat',
// 	resave: true,
// 	saveUninitialized: true
// }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(methodOverride());
app.use("/api/example_class", example_class);
app.use("/api/avaliacao", avaliacao);
app.get("/",function(req, res) {
	res.send("hello");
});

app.listen(app.get('port'), function() {
	process.env.NODE_ENV = app.get('env');
	console.log("Running in " + process.env.NODE_ENV + " mode");
	console.log("Listening on localhost:" + app.get('port'));
})
