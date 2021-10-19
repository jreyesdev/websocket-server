const ticketControl = require('../models/ticketControl')
const ticket = new ticketControl()

const socketController = socket => {
    socket.emit('ultimo-ticket',ticket.ultimo)
    
    socket.on('sig-ticket',(pay,callback) => {
        const siguiente = ticket.siguiente()
        callback(siguiente)
        // Todo: notificar que hay nuevo ticket por atender
    })
}


module.exports = {
    socketController
}