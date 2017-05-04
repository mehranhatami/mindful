const AuthController = require('../controllers/auth_controller')

module.exports = (app) => {
  app.post('/api/auth/', AuthController.authenticate)
}
