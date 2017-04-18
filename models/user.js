const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const UserSchema = new Schema({
	username: {
		type: String,
    validate: {
      validator: (username) => username.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
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


UserSchema.virtual('reflectionCount').get(function() {
	return this.reflections.length;
}) 

UserSchema.pre('remove', function(next) {
	const Reflection = mongoose.model('reflection')
	Reflection.remove({ _id: { $in: this.reflections }})
		.then(() => next())
})

const User = mongoose.model('user', UserSchema)

module.exports = User