const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

const HabitSchema = new Schema({
	sleep: Boolean,
	exercise: Boolean,
	diet: Boolean,
	meditation: Boolean,
	reflection: {
		type: ObjectId,
		ref: 'reflection'
	}
})

module.exports = HabitSchema