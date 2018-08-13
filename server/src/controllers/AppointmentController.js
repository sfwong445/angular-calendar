const { Appointments } = require('../models/')

module.exports = {
    async add(req, res) {
        try {
            const appointment = await Appointments.create(req.body);
            res.send(appointment.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'An error occured adding the appointment'
            })
        }
    },

    async display(req, res) {
        try {
            const appointments = await Appointments.findAll({
                order: [['date']]
            });
            res.send(appointments);
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error occured showing all the appointments.'
            })
        }
    }
}