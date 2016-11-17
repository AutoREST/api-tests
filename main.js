var mongoose = require('mongoose');
var Avaliacao = require('./models/avaliacao');
var Example_Class = require('./models/example_class');

var connection_string = process.env.DATABASE || 'mongodb://localhost/mongooseTests';
mongoose.connect(connection_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we\'re connected!');
});

var __id = 1;

function listCol(collection) {
    switch (collection) {
        case "ava":
            Avaliacao.find(function(err, docs) { if (err){ console.error(err);} else {console.log(docs);} });
            break;
        case "ex":
            Example_Class.find(function(err, docs) { if (err){ console.error(err);} else {console.log(docs);} });
            break;
        default:
    }
}

function addDoc(collection,data) {
    switch (collection) {
        case "ava":
            Avaliacao.create({
                _id:__id,
				// key:{
					matriculaAluno: 1,
					numTurma: 2
				// }
                ,
				notaG1: 5,
				notaG2: 5,
				faltas: 3
            }, function(err, doc) {
                if (err)
                    console.error(err);
                else
                    console.log(doc);
            });
            __id++;
            break;
        case "ex":
            Example_Class.create({
                attribute0:__id,
                attribute1:false,
                attribute2:2,
                attribute3:"N",
                attribute4:1.5,
                attribute5:1.2,
                attribute6:2,
                attribute7:4,
                attribute8:[12.2],
                attribute9:new Date(),
                attribute10:{a:1},
                attribute11:"asd"
            }, function(err,doc) {
                if (err)
                    console.error(err);
                else{
                    __id++;
                    console.log(doc.cleanObject());
                }
            });
            break;
        default:
    }
}
//
// function getDoc(collection,id) {
//     User.findById(req.params.userId, function(err, doc) {
// 		if (err)
// 			res.send(err);
// 		res.send(doc);
// 	});
// }
//
// function removeDoc(collection,id) {
//     User.findByIdAndRemove(req.params.userId, {}, function(err, doc) {
// 		if (err)
// 			res.send(err);
// 		res.send(doc);
// 	});
// }

var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    var cmd = d.toString().trim();
    console.log("you entered: [" + cmd + "]");
    var args = cmd.split(" ");
    if(args.length > 1){
        var collection = args[1].toLowerCase();
        if(args.length >= 3)
            var data = JSON.parse(args[2]);
        switch (args[0]) {
            case "add":
                addDoc(collection,data);
                break;
            case "ls":
                listCol(collection);
                break;
            case "id":
                __id = collection;
                break;
            default:
        }
    }
});
