const ReflectionsController = require('../controllers/reflections_controller')

module.exports = (app) => {
  app.post('/api/reflections', ReflectionsController.create);
  app.put('/api/reflections/:id', ReflectionsController.edit);
  app.delete('/api/reflections/:id', ReflectionsController.delete);
}
