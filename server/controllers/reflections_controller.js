const Reflection = require('../models/reflection')

module.exports = {
  create(req, res, next) {
    const reflectionProps = req.body
    Reflection.create(reflectionProps)
      .then(reflection => res.json(reflection))
      .catch(next)
  },
  edit(req, res, next) {
    const reflectionId = req.params.id
    const reflectionProps = req.body
    Reflection.findByIdAndUpdate(reflectionId, reflectionProps)
      .then(() => Reflection.findById(reflectionId))
      .then(reflection => res.send(reflection))
      .catch(next)
  },
  delete(req, res, next) {
    const reflectionId = req.params.id
    Reflection.findByIdAndRemove(reflectionId)
      .then(reflection => res.status(204).send(reflection))
      .catch(next)
  }
}
