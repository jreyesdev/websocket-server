const socketController = socket => {
    socket.on('enviar-mensaje',(pay,callback) => {
        socket.broadcast.emit('enviar-mensaje',pay)
        callback({ id: 123, fecha: new Date().getTime() })
    })
}


module.exports = {
    socketController
}