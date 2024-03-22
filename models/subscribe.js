var mongoose = require('mongoose');
var Schema = mongoose.Schema;

subscribeSchema = new Schema( {
	
	id: Number,
	email: String,

}, {timestamps: true}),
Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = Subscribe;
