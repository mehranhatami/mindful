const User = require('../models/user')

module.exports = {
  authenticate(req, res, next) {
    const username = req.body.username
    const password = req.body.password
    User.findOne({ username, password })
      .then(user => {
        if (!user) {
          res.status(403).send('username not found')
        } else if (user.password !== password) {
          res.status(401).send('password is incorrect')
        } else {
          res.send(user)
        }
      })
      .catch(next)
  },
}
