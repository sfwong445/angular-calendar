const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationPolicy = require('./policies/AuthenticationPolicy');
const AppointmentController = require ('./controllers/AppointmentController')

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.send({
            message: 'Welcome to the page of nothingless'
        })
    })

    app.post('/register', AuthenticationPolicy.register, AuthenticationController.register);
    app.post('/login', AuthenticationController.login);
    app.get('/users', AuthenticationController.display);
    app.get('/appointments', AppointmentController.display);
    app.post('/appointments/add', AppointmentController.add);
    app.delete('/appointments/:appointmentId/delete', AppointmentController.delete);
}