const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types
const HabitSchema = require('./habit')

const ReflectionSchema = new Schema({
  content: String,
  contentSentiment: Number,
  createdAt: Date,
  updatedAt: Date,
  habit: [HabitSchema]
})

ReflectionSchema.virtual('reflectionScore').get(function() {
  return this.contentSentiment * .75
})


const Reflection = mongoose.model('reflection', ReflectionSchema)

module.exports = Reflection
