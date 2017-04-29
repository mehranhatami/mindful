const UsersController = require('../controllers/users_controller')

module.exports = (app) => {
  app.get('/api/users', UsersController.getAll)
  app.get('/api/users/:id', UsersController.getOne)
  app.post('/api/users', UsersController.create)
  app.put('/api/users/:id', UsersController.edit)
  app.delete('/api/users/:id', UsersController.delete)
}
