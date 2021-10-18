const compression = require('express-compression')
const express = require('express')
const cors = require('cors')
const { socketController } = require('../sockets/controller')

class Server{
    constructor(){
        this.port = process.env.APP_PORT
        this.app = express()
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)
        this.middlewares()
        this.routes()
        this.eventSockets()
    }

    middlewares(){
        this.app.use(compression())
        this.app.use(cors())
        this.app.use(express.static('public'))
    }

    routes(){}

    eventSockets(){
        this.io.on('connection', socketController)
    }

    listen(){
        this.server.listen(this.port,() => console.log(`Server on port ${this.port}`))
    }
}

module.exports = new Server()