const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const userRouter = require('./routes/user')

app.use(express.static('public'))
app.use(bodyParser.json())

app.use('api/v1/users', userRouter)

app.listen(process.env.PORT || 8080, () => {
  console.log(`listeninig on http://localhost:${process.env.PORT || 8080}`)
})

module.exports = {app}
cd ..
