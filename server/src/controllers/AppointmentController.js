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
            res.status(500).send({
                error: 'An error occured showing all the appointments.'
            })
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.appointmentId
            const appointment = await Appointments.findById(id)
            if (!appointment) {
                res.status(403).send({
                    message: 'This appointment does not exist'
                })
            }
            await appointment.destroy()
            res.send(appointment)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error occured removing this instance.'
            })
        }
    }
}