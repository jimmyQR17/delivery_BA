const UsersController = require('../controllers/usersController');

module.exports = (app,upload) => {
//get para obtener datos
app.get('/api/users/getAll', UsersController.getAll);

// Guardar datos
app.post('/api/users/create', UsersController.register);


app.post('/api/users/login', UsersController.login);

//Actualizar datos

app.put('/api/users/update', upload.array('image', 1), UsersController.update);

}