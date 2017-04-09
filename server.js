var express = require('express');
var app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

app.use(express.static('public'));
app.listen(process.env.PORT || 8080, () => {
	console.log(`listeninig on http://localhost:${process.env.PORT || 8080}`)
});

module.exports = {app}