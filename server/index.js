const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const userRouter = require('./routes/user')
const reflectionRouter = require('./routes/reflection')

app.use(express.static('public'))
app.use(bodyParser.json())

userRouter(app)
reflectionRouter(app)

app.listen(process.env.PORT || 8080, () => {
  /* eslint-disable no-console*/
  console.log(`listening on http://localhost:${process.env.PORT || 8080}`)
})

module.exports = app
