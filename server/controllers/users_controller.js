const User = require('../models/user')

module.exports = {
  getAll(req, res, next) {
    User.find({})
      .then(users => res.json(users))
      .catch(next)
  },
  getOne(req, res, next) {
    const userId = req.params.id
    User.findById(userId)
      .then(user => res.json(user))
      .catch(next)
  },
  create(req, res, next) {
    const userProps = req.body
    const userId = req.body._id
    // verify correct keys being passed
    const user = new User(userProps)
    User.findById(user._id)
      .then(() => {
        User.findById(userId)
          .then(() => res.json(user))
          .catch(next)
      })
      .then((models) => {
        res.status(201).json({ user: models[0], reflection: models[1] })
      })
      .catch(next)
  },
  edit(req, res, next) {
    const userId = req.params.id
    const userProps = req.body
    User.findByIdAndUpdate(userId, userProps)
      .then(() => User.findById(userId))
      .then(user => res.send(user))
      .catch(next)
  },
  delete(req, res, next) {
    const userId = req.params.id
    User.findByIdAndRemove(userId)
      .then(user => res.status(204).send(user))
      .catch(next)
  }
}
