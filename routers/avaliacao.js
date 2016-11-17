var express = require('express');
var router = express.Router();
var Avaliacao = require('../models/avaliacao');


router.get('/', function(req, res) {
	Avaliacao.find(function(err, docs) {
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

router.get('/turma/:numTurma', function(req, res) {
	Avaliacao.find({
		numTurma: req.params.numTurma
	}, function(err, docs) {
		if (err) {
			res.status(400).send(err);
		} else {
			if (docs) {
				var jsons = [];
				for (var doc of docs)
					jsons.push(doc.cleanObject());
				res.status(200).json(jsons);
			} else
				res.status(404).send();
		}
	});
});

router.get('/aluno/:matriculaAluno', function(req, res) {
	Avaliacao.find({
		matriculaAluno: req.params.matriculaAluno
	}, function(err, docs) {
		if (err) {
			res.status(400).send(err);
		} else {
			if (docs) {
				var jsons = [];
				for (var doc of docs)
					jsons.push(doc.cleanObject());
				res.status(200).json(jsons);
			} else
				res.status(404).send();
		}
	});
});

module.exports = router;