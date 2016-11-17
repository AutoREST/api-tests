var express = require('express');
var router = express.Router();
var Example_Class = require('../models/example_class');

router.get('/', function(req, res) {
	Example_Class.find(function(err, docs) {
		if (err) {
			res.status(400).send(err);
		} else {
			var jsons = [];
			for (var doc of docs)
				jsons.push(doc.cleanObject());
			res.status(200).json(jsons);
		}
	});
});

router.get('/:identifier', function(req, res) {
	Example_Class.findById(req.params.identifier, function(err, doc) {
		if (err){
			res.status(400).send(err);
		}
		else{
			if(doc)
				res.status(200).json(doc.cleanObject());
			else
				res.status(404).send();
		}
	});
});

router.head('/:identifier', function(req, res) {
	Example_Class.findById(req.params.identifier, function(err, doc) {
		if (err){
			res.status(400).send(err);
		}
		else{
			if(doc)
				res.status(200).send();
			else
				res.status(404).send();
		}
	});
});

router.post('/', function(req, res) {
	if (req.body.attribute0) {
		Example_Class.findByIdAndUpdate(
			req.body.attribute0, {
				_id: req.body.attribute0,
				attribute1: req.body.attribute1,
				attribute2: req.body.attribute2,
				attribute3: req.body.attribute3,
				attribute4: req.body.attribute4,
				attribute5: req.body.attribute5,
				attribute6: req.body.attribute6,
				attribute7: req.body.attribute7,
				attribute8: req.body.attribute8, //array
				attribute9: req.body.attribute9, //date
				attribute10: req.body.attribute10, //obj
				attribute11: req.body.attribute11
			}, {
				new: true,
				upsert: true
			},
			function(err, doc) {
				if (err)
					res.status(400).send(err);
				else
					res.status(201).send(doc.cleanObject());
			}
		);
	} else {
		res.status(400).send();
	}
});

router.put('/:identifier', function(req, res) {
	Example_Class.findByIdAndUpdate(
		req.params.identifier, {
			attribute0: req.params.identifier,
			attribute1: req.body.attribute1,
			attribute2: req.body.attribute2,
			attribute3: req.body.attribute3,
			attribute4: req.body.attribute4,
			attribute5: req.body.attribute5,
			attribute6: req.body.attribute6,
			attribute7: req.body.attribute7,
			attribute8: req.body.attribute8, //array
			attribute9: req.body.attribute9, //date
			attribute10: req.body.attribute10, //obj
			attribute11: req.body.attribute11
		}, {
			new: true,
			upsert: true
		},
		function(err, doc) {
			if (err)
				res.status(400).send(err);
			else
				res.status(201).send(doc.cleanObject());
		}
	);
});

router.patch('/:identifier', function(req, res) {
	Example_Class.findById(req.params.identifier, function(err, doc) {
		if (err) {
			res.send(err);
		} else {
			if (doc) {
				if (req.body.attribute1)
					doc.attribute1 = req.body.attribute1;
				if (req.body.attribute2)
					doc.attribute2 = req.body.attribute2;
				if (req.body.attribute3)
					doc.attribute3 = req.body.attribute3;
				if (req.body.attribute4)
					doc.attribute4 = req.body.attribute4;
				if (req.body.attribute5)
					doc.attribute5 = req.body.attribute5;
				if (req.body.attribute6)
					doc.attribute6 = req.body.attribute6;
				if (req.body.attribute7)
					doc.attribute7 = req.body.attribute7;
				if (req.body.attribute8)
					doc.attribute8 = req.body.attribute8; //array
				if (req.body.attribute9)
					doc.attribute9 = req.body.attribute9; //date
				if (req.body.attribute10)
					doc.attribute10 = req.body.attribute10; //obj
				if (req.body.attribute11)
					doc.attribute11 = req.body.attribute11;
				doc.save(function(err) {
					if (err){
						res.status(400).send(err);
					}
					else{
						res.status(200).send(doc.cleanObject());
					}
				});
			}
			else{
				res.status(404).send();
			}
		}
	});
});

router.delete('/:identifier', function(req, res) {
	Example_Class.findByIdAndRemove(req.params.identifier, {}, function(err, doc) {
		if (err)
			res.status(400).send(err);
		else
			res.status(204).send();
	});
});

module.exports = router;