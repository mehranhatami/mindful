var express = require('express');
var app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

const userRouter = require('./routes/user');

app.use(express.static('public'));

app.use('api/v1/users', userRouter)


app.listen(process.env.PORT || 8080, () => {
	console.log(`listeninig on http://localhost:${process.env.PORT || 8080}`)
});

module.exports = {app}