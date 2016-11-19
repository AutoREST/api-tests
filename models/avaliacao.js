var mongoose = require('mongoose'),
    integerValidator = require('mongoose-integer'),
	Schema = mongoose.Schema;

var AvaliacaoSchema = new Schema({
	matriculaAluno: {
		type:Number,
		integer: true,
		required: true
	},
	numTurma:{
		type: Number,
		integer: true,
		required: true
	},
	notaG1: {
		type: Number,
		required: false
	},
	notaG2: {
		type: Number,
		required: false
	},
	faltas: {
		type: Number,
		integer: true,
		required: false
	}
});

AvaliacaoSchema.index({ matriculaAluno: 1, numTurma: 1 }, { unique: true });

AvaliacaoSchema.plugin(integerValidator);

AvaliacaoSchema.methods.cleanObject = function() {
    var doc = this.toObject({ virtuals: true });
    delete doc.__v;
    delete doc._id;
    delete doc.id;
    return doc;
};

module.exports = mongoose.model('Avaliacao', AvaliacaoSchema);
