const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const DATABASE_URL = process.env.DATABASE_URL
const userRouter = require('./routes/user')
const reflectionRouter = require('./routes/reflection')

mongoose.Promise = global.Promise

function server() {
  app.use(bodyParser.json())

  userRouter(app)
  reflectionRouter(app)

  app.listen(process.env.PORT || 8080, () => {
    /* eslint-disable no-console*/
    console.log(`listening on PORT:${process.env.PORT || 8080}`)
  })
}

mongoose.connect(DATABASE_URL || 'mongodb://localhost/mindful')
mongoose.connection
  .once('open', () => { server() })
  .on('error', (error) => {
    /* eslint-disable no-console */
    console.warn('Warning', error)
  })

module.exports = app
