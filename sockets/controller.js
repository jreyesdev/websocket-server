const socketController = socket => {
    console.log('Cliente conectado ',socket.id)
    socket.on('disconnect',()=> {
        console.log('Cliente desconectado ',socket.id)
    })
    socket.on('enviar-mensaje',(pay,callback) => {
        socket.broadcast.emit('enviar-mensaje',pay)
        callback({ id: 123, fecha: new Date().getTime() })
    })
}


module.exports = {
    socketController
}