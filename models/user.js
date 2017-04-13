const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const UserSchema = new Schema({
	username: String,
		type: String,
    validate: {
      validator: (name) => name.length > 3,
      message: 'Name must be longer than 3 characters.'
    },
    required: [true, 'Name is required.']
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	mindfulnessScore: Number,
	reflections: [{
		type: ObjectId,
		ref: 'reflection'
	}]
})

UserSchema.pre('remove', function(next) {
	const Reflection = mongoose.model('reflection')
	Reflection.remove({ _id: { $in: this.reflections }})
		.then(() => next())
})

const User = mongoose.model('user', UserSchema)

module.exports = User