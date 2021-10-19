const ticketControl = require('../models/ticketControl')
const ticket = new ticketControl()

const socketController = socket => {
    socket.emit('ultimo-ticket',ticket.ultimo)
    socket.emit('ultimos4-ticket',ticket.ultimos4)
    socket.broadcast.emit('pendi-ticket',ticket.tickets.length)
    
    socket.on('sig-ticket',(pay,callback) => {
        const siguiente = ticket.siguiente()
        callback(siguiente)
        // Todo: notificar que hay nuevo ticket por atender
    })
    
    socket.on('atender-ticket',({ escritorio },callback) => {
        const resp = {}
        if(!escritorio){
            resp.status = false
            resp.msg = 'El escritorio es obligatorio y debe ser numerico'
        }
        if(!resp.length){
            const atender = ticket.atenderTicket(escritorio.join(' '))

            // Notificar actualizar ultimos 4
            socket.broadcast.emit('ultimos4-ticket',ticket.ultimos4)

            if(!atender){
                resp.status = false
                resp.msg = 'Ya no hay tickets que atender'
            }else{
                resp.status = true
                resp.ticket = atender
            }
        }
        socket.emit('pendi-ticket',ticket.tickets.length)
        callback(resp)
    })
}


module.exports = {
    socketController
}